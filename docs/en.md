# ⚠ THE USE OF SELF BOTS IS PROHIBITED BY THE DISCORD TERMS OF USE. ALL ACTIONS DESCRIBED IN THIS TUTORIAL ARE PERFORMED AT YOUR OWN RISK

## Items

1. [Setup](#setup)
2. [Commands](#commands)
3. [FAQ](#FAQ)

# Setup

1. Download [latest version](https://github.com/D3rise/discord-cipher-selfbot/releases) of app and unpack the archive in any desired location in the system.
2. Rename file `.env.example` into `.env`
3. [Get your Discord token](https://discordhelp.net/discord-token) and put it in place of `HERE IS YOUR DISCORD TOKEN` inside file `.env`
4. Set your desired prefix in the file `.env` (at will)
5. Execute file `app.exe` (if you're using Windows), `app-linux` (if you're using Linux) и `app-macos` (if you're using Mac OS)

# Commands

_Note:_ each command must start with the prefix you specified in the file `.env`

1. `mode nameOfCipher` - change current cipher. Existing ciphers: `none` (disable encryption), `caesar` (Caesar's cipher), `morse` (Morse code), `multi` (Caesar's cipher + Morse code) и `vigenere` (the Vigenère cipher)
2. `key secretPhrase` - change the secret phrase for the Vigener cipher.
3. `shift shiftAmount` - change the shift alphabetically in the Caesar cipher.

# FAQ

В: **Do I need to enter a prefix before each message to encrypt it?**
О: _No, every message is encrypted when it is sent_

В: **How do I turn off encryption?**
О: _Write a command `mode none`_

В: **How do I switch the cipher?**
О: _Use the command `mode`_

В: **How can I change the shift for the Caesar cipher?**
О: _Use the command `shift`_

В: **How can I change the secret phrase for the Vigener cipher?**
О: _Use the command `key`_
