// Imports
import Discord from "discord.js";
import mongodb from "mongodb";
import path from "path";

import CONFIG from "../config_variables.js";
import API from "./api.js";

// Defining Required Variables
const { MongoClient } = mongodb;
const CLIENT = new Discord.Client();
const __dirname = path.resolve();
let message_status = {};

// API Functions
const fetchDocuments = () =>
  MongoClient.connect(
    CONFIG.MONGODB_URI,
    { useUnifiedTopology: true },
    (err, client) => {
      if (err === null) {
        const db = client.db(CONFIG.DB_NAME);

        API.findDocuments(db, (docs) => {
          console.log("=== Documents Fetched ===");
          message_status = docs;
          client.close();
        });
      } else {
        console.log("=== Error Connecting To Server ===");
      }
    }
  );

const updateDocuments = () =>
  MongoClient.connect(
    CONFIG.MONGODB_URI,
    { useUnifiedTopology: true },
    (err, client) => {
      if (err === null) {
        const db = client.db(CONFIG.DB_NAME);

        API.updateDocument(db, message_status, () => {
          console.log("=== Updated The Documents ===");
          client.close();
        });
      } else {
        console.log("=== Error Connecting To Server ===");
      }
    }
  );

// On Server Ready
CLIENT.on("ready", () => {
  fetchDocuments();
  console.log(`=== Logged In As: ${CLIENT.user.tag} ===`);
});

// On Error
CLIENT.on("error", (error) => {
  console.log(`=== ERROR ===`);
  console.log("===", error, "===");
});

// Toggle Join Message
CLIENT.on("message", (message) => {
  let MESSAGE = message.content.toLowerCase();

  if (true) {
  }

  // Other Commands
  if (MESSAGE === ".help") {
    message.reply(
      `List Of Current Greetings To Enable/Disable: ${Object.keys(
        message_status
      )
        .slice(1)
        .map((item) => {
          return `\n.${item}`;
        })}`
    );
  }

  if (MESSAGE === ".reload") {
    message.reply(`Checking for updates...`).then(() => {
      fetchDocuments();
    });
  }

  // Setting User Intro On Or Off
  // UPDATE TO MAP
  if (MESSAGE === ".michael") {
    message_status.michael = !message_status.michael;

    updateDocuments();

    message
      .reply(
        `Michael Greeting: ${
          message_status.michael === true ? "Enabled" : "Disabled"
        }`
      )
      .then(() =>
        message
          .react("🤔")
          .then(() =>
            message.react(message_status.michael === true ? "✅" : "❌")
          )
      );
  }

  if (MESSAGE === ".adam") {
    message_status.adam = !message_status.adam;

    updateDocuments();

    message
      .reply(
        `Adam Greeting: ${
          message_status.adam === true ? "Enabled" : "Disabled"
        }`
      )
      .then(() =>
        message
          .react("😐")
          .then(() => message.react(message_status.adam === true ? "✅" : "❌"))
      );
  }

  if (MESSAGE === ".dave") {
    message_status.dave = !message_status.dave;

    updateDocuments();

    message
      .reply(
        `Dave Greeting: ${
          message_status.dave === true ? "Enabled" : "Disabled"
        }`
      )
      .then(() =>
        message
          .react("👴")
          .then(() => message.react(message_status.dave === true ? "✅" : "❌"))
      );
  }

  if (MESSAGE === ".ben") {
    message_status.ben = !message_status.ben;

    updateDocuments();

    message
      .reply(
        `Ben Greeting: ${message_status.ben === true ? "Enabled" : "Disabled"}`
      )
      .then(() =>
        message
          .react("🐧")
          .then(() => message.react(message_status.ben === true ? "✅" : "❌"))
      );
  }

  if (MESSAGE === ".jack") {
    message_status.jack = !message_status.jack;

    updateDocuments();

    message
      .reply(
        `Jack Greeting: ${
          message_status.jack === true ? "Enabled" : "Disabled"
        }`
      )
      .then(() =>
        message
          .react("💢")
          .then(() => message.react(message_status.jack === true ? "✅" : "❌"))
      );
  }

  if (MESSAGE === ".dan") {
    message_status.dan = !message_status.dan;

    updateDocuments();

    message
      .reply(
        `Dan Greeting: ${message_status.dan === true ? "Enabled" : "Disabled"}`
      )
      .then(() =>
        message
          .react("👑")
          .then(() => message.react(message_status.dan === true ? "✅" : "❌"))
      );
  }

  if (MESSAGE === ".sam") {
    message_status.sam = !message_status.sam;

    updateDocuments();

    message
      .reply(
        `Sam Greeting: ${message_status.sam === true ? "Enabled" : "Disabled"}`
      )
      .then(() =>
        message
          .react("🤠")
          .then(() => message.react(message_status.sam === true ? "✅" : "❌"))
      );
  }

  if (MESSAGE === ".zach") {
    message_status.zach = !message_status.zach;

    updateDocuments();

    message
      .reply(
        `Sam Greeting: ${message_status.zach === true ? "Enabled" : "Disabled"}`
      )
      .then(() =>
        message
          .react("🤠")
          .then(() => message.react(message_status.zach === true ? "✅" : "❌"))
      );
  }

  if (MESSAGE === ".niamh") {
    message_status.niamh = !message_status.niamh;

    updateDocuments();

    message
      .reply(
        `Niamh Greeting: ${
          message_status.niamh === true ? "Enabled" : "Disabled"
        }`
      )
      .then(() =>
        message
          .react("🐛")
          .then(() =>
            message.react(message_status.niamh === true ? "✅" : "❌")
          )
      );
  }

  if (MESSAGE === ".kaelem") {
    message_status.kaelem = !message_status.kaelem;

    updateDocuments();

    message
      .reply(
        `Kaelem Greeting: ${
          message_status.kaelem === true ? "Enabled" : "Disabled"
        }`
      )
      .then(() =>
        message
          .react("🚽")
          .then(() =>
            message.react(message_status.kaelem === true ? "✅" : "❌")
          )
      );
  }

  if (MESSAGE === ".john") {
    message_status.john = !message_status.john;

    updateDocuments();

    message
      .reply(
        `John Greeting: ${
          message_status.john === true ? "Enabled" : "Disabled"
        }`
      )
      .then(() =>
        message
          .react("😱")
          .then(() => message.react(message_status.john === true ? "✅" : "❌"))
      );
  }

  if (MESSAGE === ".luke") {
    message_status.luke = !message_status.luke;

    updateDocuments();

    message
      .reply(
        `Luke Greeting: ${
          message_status.luke === true ? "Enabled" : "Disabled"
        }`
      )
      .then(() =>
        message
          .react("🍃")
          .then(() => message.react(message_status.luke === true ? "✅" : "❌"))
      );
  }

  if (MESSAGE === ".mv_jack") {
    message_status.mv_jack = !message_status.mv_jack;

    updateDocuments();

    message
      .reply(
        `Jack Greeting: ${
          message_status.mv_jack === true ? "Enabled" : "Disabled"
        }`
      )
      .then(() =>
        message
          .react("😏")
          .then(() =>
            message.react(message_status.mv_jack === true ? "✅" : "❌")
          )
      );
  }
});

// Voice Connection
CLIENT.on("voiceStateUpdate", async (oldMember, newMember) => {
  if (oldMember.channelID === null || oldMember.channelID === undefined) {
    let currChannel = CLIENT.channels.cache.get(newMember.channelID);

    if (
      message_status.michael === true &&
      newMember.id === "245641882263224321"
    ) {
      let coin_flip = Math.random() < 0.5;

      await currChannel.join().then((connection) => {
        connection
          .play(
            coin_flip === true
              ? path.join(__dirname, "./media/michael_intro_1.mp3")
              : path.join(__dirname, "./media/michael_intro_2.mp3")
          )
          .on("finish", () => {
            currChannel.leave();
          });
      });
    }

    if (message_status.adam === true && newMember.id === "498263968154910720") {
      await currChannel.join().then((connection) => {
        connection
          .play(path.join(__dirname, "./media/adam_intro.mp3"))
          .on("finish", () => {
            currChannel.leave();
          });
      });
    }

    if (message_status.dave === true && newMember.id === "185511738177748992") {
      await currChannel.join().then((connection) => {
        connection
          .play(path.join(__dirname, "./media/dave_intro.mp3"))
          .on("finish", () => {
            currChannel.leave();
          });
      });
    }

    if (message_status.ben === true && newMember.id === "187348277870592010") {
      await currChannel.join().then((connection) => {
        connection
          .play(path.join(__dirname, "./media/ben_intro.mp3"))
          .on("finish", () => {
            currChannel.leave();
          });
      });
    }

    if (message_status.jack === true && newMember.id === "183623478669344768") {
      await currChannel.join().then((connection) => {
        connection
          .play(path.join(__dirname, "./media/jack_intro_1.mp3"))
          .on("finish", () => {
            currChannel.leave();
          });
      });
    }

    if (message_status.sam === true && newMember.id === "247405690128302083") {
      await currChannel.join().then((connection) => {
        connection
          .play(path.join(__dirname, "./media/sam_intro.mp3"))
          .on("finish", () => {
            currChannel.leave();
          });
      });
    }

    if (message_status.zach === true && newMember.id === "185469156093722624") {
      let coin_flip = Math.random() < 0.5;
      await currChannel.join().then((connection) => {
        connection
          .play(
            coin_flip === true
              ? path.join(__dirname, "./media/zach_intro_1.mp3")
              : path.join(__dirname, "./media/zach_intro_2.mp3")
          )
          .on("finish", () => {
            currChannel.leave();
          });
      });
    }

    if (
      message_status.niamh === true &&
      newMember.id === "509522775598301190"
    ) {
      await currChannel.join().then((connection) => {
        connection
          .play(path.join(__dirname, "./media/niamh_intro.mp3"))
          .on("finish", () => {
            currChannel.leave();
          });
      });
    }

    if (
      message_status.kaelem === true &&
      newMember.id === "159294623213289473"
    ) {
      let cringe = Math.random() < 0.1;
      await currChannel.join().then((connection) => {
        connection
          .play(
            path.join(
              __dirname,
              cringe === true
                ? "./media/kaelem_intro.mp3"
                : "./media/kaelem_intro_SHORT.mp3"
            )
          )
          .on("finish", () => {
            currChannel.leave();
          });
      });
    }

    if (message_status.john === true && newMember.id === "122868472135942146") {
      await currChannel.join().then((connection) => {
        connection
          .play(path.join(__dirname, "./media/john_intro.mp3"))
          .on("finish", () => {
            currChannel.leave();
          });
      });
    }

    if (message_status.luke === true && newMember.id === "197478845325115402") {
      await currChannel.join().then((connection) => {
        connection
          .play(path.join(__dirname, "./media/luke_intro.mp3"))
          .on("finish", () => {
            currChannel.leave();
          });
      });
    }

    if (
      message_status.mv_jack === true &&
      newMember.id === "187697230767980545"
    ) {
      await currChannel.join().then((connection) => {
        connection
          .play(path.join(__dirname, "./media/jack_intro_2.mp3"))
          .on("finish", () => {
            currChannel.leave();
          });
      });
    }

    if (message_status.dan === true && newMember.id === "184787999710511106") {
      await currChannel.join().then((connection) => {
        connection
          .play(path.join(__dirname, "\\media\\dan_intro.mp3"))
          .on("finish", () => {
            currChannel.leave();
          });
      });
    }
  }
});

// Login Via Token
CLIENT.login(CONFIG.DISCORD_TOKEN);
