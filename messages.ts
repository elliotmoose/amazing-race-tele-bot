export function welcomeMessage(accessLevel: number, chatId: number) {
  return `‎
  
<b>T̉͑̃ͦͧh̒̔ͤ̓e̓͊ ̈́ͮͥ̆ͯE͊̎ͯ̅͒yͧ̉̍ͤe̍̿ͬ̐̃ ͮ̓̂̃ ͐OS̐ͫͧͦ v͒̄9̐̓.̐ͩ̌͊̇̒1ͤͧ̀͒̇</b>
=============
<code>
> System initialized...
</code>

<b>> SYSTEM INFORMATION</b> 
<code>> User Id: ${chatId}
> Access Level: ${accessLevel}</code>


<b>> COMMANDS </b> 
/search &lt;KEYWORD&gt; - Look up keywords or people
/news &lt;DD-MM-YYYY&gt; - Look up news for a date
/cams &lt;LOC CODE&gt; - Look up surveillance for a location code
/hack &lt;HACK CODE&gt; - Intercept messages or hack into systems
`;
}

export const noAccessPrivateWhereabouts = `<b>> PRIVACY ACCESS ERROR</b>
You do not have enough permissions to access private information. Increase access level before requesting information.

Current access level: 1

<u>Enter Pass Key to Unlock Access Level 2:</u>
`;

export const noAccessArgumentAudio = `<b>> PRIVACY ACCESS ERROR</b>
Surveillance audio is safeguarded with a higher access level. Increase access level before requesting information.

Current access level: 2
`;

export function noAccessLevel3Region(accessLevel: number) {
  return `<b>> PRIVACY ACCESS ERROR</b>
You do not have enough permissions to access private information. Increase access level before requesting information.
Current access level: ${accessLevel}


<u>Enter Pass Key to Unlock Access Level 2:</u>
`;
}

// unredacted report from police
export const noAccessSynthesisReport = `<b>> PERMISSION ACCESS ERROR</b>
An additional classified document has been safeguarded with a higher access level. Increase access level before requesting information.
Current access level: 2

<u>Enter Pass Key to Unlock Access Level 3</u>
`;

export const policePostNetworkVulnerability = `<b>> NETWORK VULNERABILITY DETECTED</b>
<code>
> attempting to intercept...
> intercept success
> decoding...
> Error: decoding failed, cipher missing.

> Raw Message:
/search 101 115 115 101 110 116 105 097 108 115
</code>
`;

export function accessLevelAnnouncement(
  groupName: string,
  accessLevel: number
) {
  return `<b>*** 🔥 ANNOUNCEMENT 🔥 ***</b>
Group: <b>${groupName}</b> has achieved level ${accessLevel} access 🔓.
`;
}
