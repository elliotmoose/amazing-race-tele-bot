import dotenv from "dotenv";
dotenv.config();

import {
  conversations,
  createConversation,
  type Conversation,
  type ConversationFlavor,
} from "@grammyjs/conversations";
import { Bot, Context, InputFile, session } from "grammy";
import { Chat } from "grammy/out/types.node";
import { exit } from "process";
import {
  accessLevelRequirements,
  Clue,
  file,
  hackMap,
  locationSearch,
  newsMap,
  searchMap,
  str,
} from "./clues";
import {
  createGroupRecord,
  getGroupAccessLevel,
  getGroupIds,
  setGroupAccessLevel,
} from "./database";
import { accessLevelAnnouncement, welcomeMessage } from "./messages";

// Create a bot object
const teleBotToken = process.env.TELEGRAM_BOT_TOKEN;

if (!teleBotToken) {
  console.error("no telegram bot token");
  exit();
} else {
  console.log("bot token found");
}

type MyContext = Context & ConversationFlavor<Context>;
type MyConversation = Conversation<MyContext>;
const bot = new Bot<MyContext>(teleBotToken);

async function enforceBotInit(ctx: MyContext) {
  const chatId = ctx.update.message?.chat.id;
  if (ctx.update.message?.chat.type !== "group") {
    await ctx.reply("This bot only works in groups.");
    return false;
  }
  if (!chatId) return true;
  const groupAccessLevelRecord = await getGroupAccessLevel(chatId);
  if (!groupAccessLevelRecord) {
    await ctx.reply("Bot not initialized. Please use /start to initialize.");
    return false;
  }

  return true;
}

async function checkAccessLevelForCode(key: string, chatId: number) {
  const accessLevel = (await getGroupAccessLevel(chatId))!.accessLevel;
  const hasAccessLevelRequirement = accessLevelRequirements[key] !== undefined;
  const hasInsufficientRights =
    hasAccessLevelRequirement && accessLevel < accessLevelRequirements[key]!;

  let newKey = key;
  if (hasAccessLevelRequirement) {
    newKey += "_" + accessLevel;
  }

  return {
    accessLevel,
    codeWithAccessPostfix: newKey,
    hasAccessLevelRequirement,
    hasInsufficientRights,
  };
}

async function replyWithClue(
  clue: Clue | Clue[] | undefined,
  ctx: MyContext,
  fallback: string
) {
  if (!clue) {
    return ctx.reply(fallback);
  }

  async function _replyWithClue(clue: Clue) {
    switch (clue.type) {
      case "file":
        return ctx.replyWithDocument(new InputFile(clue.value));
      case "photo":
        return ctx.replyWithPhoto(new InputFile(clue.value), {
          caption: clue.caption,
          parse_mode: "HTML",
        });
      case "string":
        return ctx.reply(clue.value, { parse_mode: "HTML" });
    }
  }
  if (Array.isArray(clue)) {
    for (let eachClue of clue) {
      await _replyWithClue(eachClue);
    }
  } else {
    _replyWithClue(clue);
  }
}

async function announceToAll(message: string) {
  const chatIds = await getGroupIds();
  try {
    for (let chatId of chatIds) {
      bot.api.sendMessage(chatId, message, { parse_mode: "HTML" });
    }
  } catch (error) {
    console.error(error);
  }
}

bot.use(
  session({
    initial() {
      // return empty object for now
      return {};
    },
  })
);

bot.use(conversations());

// Register listeners to handle messages
// bot.on("message:text", (ctx) => ctx.reply("Echo: " + ctx.message.text));

bot.use(
  createConversation(async (conversation, ctx) => {
    console.log("message");
    await ctx.reply("Hi there! What is your name?");
    const { message } = await conversation.wait();
    await ctx.reply(`Welcome to the chat, ${message?.text}!`);
  }, "hello-reply")
);

bot.command("start", async (ctx) => {
  const chatId = ctx.update.message?.chat.id;
  if (!chatId) return;
  let accessLevel = await getGroupAccessLevel(chatId);
  if (!accessLevel) {
    accessLevel = await createGroupRecord(chatId);
  }
  await ctx.reply(welcomeMessage(accessLevel!.accessLevel, chatId), {
    parse_mode: "HTML",
  });

  await replyWithClue(file("./files/background.pdf"), ctx, "");
  replyWithClue(file("./files/ascii.png"), ctx, "");
  replyWithClue(file("./files/code.png"), ctx, "");
});
bot.command("search", async (ctx) => {
  if (!(await enforceBotInit(ctx))) return;
  if (!ctx.message) return;
  const keyword = ctx.message.text.split(" ").slice(1).join(" ");
  const key = keyword.toLowerCase();
  if (!keyword) {
    await ctx.reply("Usage: /search <SEARCH KEYWORD>");
  } else {
    if (searchMap[key]) {
      await replyWithClue(
        searchMap[key],
        ctx,
        `No search results found for "${keyword}"`
      );
    } else {
      const { codeWithAccessPostfix } = await checkAccessLevelForCode(
        key,
        ctx.message.chat.id
      );
      if (locationSearch[codeWithAccessPostfix] !== undefined) {
        await ctx.reply(
          `${keyword} is a location code for surveillance cameras.`
        );
        return;
      }

      if (hackMap[codeWithAccessPostfix] !== undefined) {
        await ctx.reply(
          `${keyword} is an access key used to hack into systems.`
        );
        return;
      }

      if (newsMap[codeWithAccessPostfix] !== undefined) {
        await ctx.reply(`news found for date: ${keyword}`);
        return;
      }

      await ctx.reply(`No search results found for "${keyword}"`);
    }
  }
});
bot.command("news", async (ctx) => {
  if (!(await enforceBotInit(ctx))) return;
  if (!ctx.message) return;

  const date = ctx.message.text.split(" ").slice(1).join(" ").toLowerCase();
  const isValidDate = (date: string) => {
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    return dateRegex.test(date);
  };
  if (!date || !isValidDate(date)) {
    await ctx.reply("Usage: /news <DD-MM-YYYY>");
  } else {
    await replyWithClue(newsMap[date], ctx, "No news found for that date");
  }
});
bot.command("cams", async (ctx) => {
  if (!(await enforceBotInit(ctx))) return;
  if (!ctx.message) return;
  const chatId = ctx.update.message.chat.id;
  const locationCode = ctx.message.text.split(" ").slice(1).join(" ");

  const { codeWithAccessPostfix } = await checkAccessLevelForCode(
    locationCode.toLowerCase(),
    chatId
  );

  console.log("/cams", codeWithAccessPostfix);

  if (!locationCode) {
    await ctx.reply("Usage: /search <LOCATION CODE>");
  } else {
    await replyWithClue(
      locationSearch[codeWithAccessPostfix],
      ctx,
      `Invalid Location Code "${locationCode}"`
    );
  }
});

bot.command("hack", async (ctx) => {
  if (!(await enforceBotInit(ctx))) return;
  if (!ctx.message) return;
  const chatId = ctx.update.message.chat.id;
  const hackCode = ctx.message.text.split(" ").slice(1).join(" ");
  const { accessLevel, codeWithAccessPostfix, hasAccessLevelRequirement } =
    await checkAccessLevelForCode(hackCode.toLowerCase(), chatId);
  if (!hackCode) {
    await ctx.reply("Usage: /hack <HACK CODE>");
  } else {
    if (accessLevel < 2 && hasAccessLevelRequirement) {
      await replyWithClue(str("Minimum access level 2 required"), ctx, "");
    } else {
      await replyWithClue(
        hackMap[codeWithAccessPostfix],
        ctx,
        "Invalid Hack Code"
      );
    }
  }
});

bot.on("message:text", async (ctx) => {
  if (!(await enforceBotInit(ctx))) return;

  const accessLevel = (await getGroupAccessLevel(ctx.update.message.chat.id))!
    .accessLevel;

  //========================================================================
  //
  //                            LEVEL 2 ACCESS
  //
  //========================================================================
  if (ctx.message.text.toLowerCase() === "letters") {
    if (accessLevel >= 2) {
      await ctx.reply("You already have access.");
      return;
    }
    //     await ctx.reply(`
    // ‎

    // B̓̈u̿̈́̉̒̂̚tͨ̂̄̎̊̒ͪ w̓̎ͨ͋̂͗i͑ͩͬ͌ͪ̚s͗͒ͩͨ̋̓ͯd̆̈͌ͥo̾ͯ͛̍̒̚m̂̈́̂̆̋̚ ̃̔̔l̾̍̓̚i̍̑ͩͬ͂̑s̒̔̔̔̚t̐̑̌ͭ̊e̓̈̈́̃̌nͦ̄̅̔s̾̋̎̂̒`);
    await setGroupAccessLevel(ctx.update.message.chat.id, 2);
    await ctx.reply("> ACCESS LEVEL 2: GRANTED");
    const groupChat = ctx.update.message.chat as Chat.GroupChat;
    if (!groupChat.title) return;
    const groupName = groupChat.title;
    await announceToAll(accessLevelAnnouncement(groupName, 2));
  }

  //========================================================================
  //
  //                            LEVEL 3 ACCESS
  //
  //========================================================================
  if (ctx.message.text.toLowerCase() === "knowledge speaks") {
    if (accessLevel < 2) {
      await ctx.reply("You must first have level 2 access");
      return;
    }

    if (accessLevel >= 3) {
      await ctx.reply("You already have access.");
      return;
    }
    await ctx.reply(`
‎

B̓̈u̿̈́̉̒̂̚tͨ̂̄̎̊̒ͪ w̓̎ͨ͋̂͗i͑ͩͬ͌ͪ̚s͗͒ͩͨ̋̓ͯd̆̈͌ͥo̾ͯ͛̍̒̚m̂̈́̂̆̋̚ ̃̔̔l̾̍̓̚i̍̑ͩͬ͂̑s̒̔̔̔̚t̐̑̌ͭ̊e̓̈̈́̃̌nͦ̄̅̔s̾̋̎̂̒`);
    await setGroupAccessLevel(ctx.update.message.chat.id, 3);
    await ctx.reply("> ACCESS LEVEL 3: GRANTED");

    const groupChat = ctx.update.message.chat as Chat.GroupChat;
    if (!groupChat.title) return;
    const groupName = groupChat.title;
    await announceToAll(accessLevelAnnouncement(groupName, 3));
  }
});

bot.catch(async (err) => {
  console.error(err);
  // await prisma.$disconnect();
});

async function startBot() {
  await bot.start();
  console.log("end");
}

startBot();
