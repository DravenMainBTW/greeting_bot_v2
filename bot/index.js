// Imports
import Discord from "discord.js";
import path from "path";
import CONFIG from "../config_variables.js";
import API from "./api.js";

// Defining Required Variables
const CLIENT = new Discord.Client();
const __dirname = path.join(path.resolve(), "./bot");
let bound_users = [];
// CHANGE: externally manage this instead of hardcode
let accepted_admins = [
  "184787999710511106",
  "187348277870592010",
  "159294623213289473",
];

// API Functions
const listBindings = () =>
  API.listBindings()
    .then((res) => {
      console.log("=== Documents Fetched ===");
      bound_users = res;
    })
    .catch((e) => {
      console.log(`=== Error Below === `);
      console.log(`=== ${e} === `);
    });

const createBinding = (data) =>
  API.createBinding(data)
    .then(() => {
      console.log("=== Document Created ===");
      listBindings();
    })
    .catch((e) => {
      console.log(`=== Error Below === `);
      console.log(`=== ${e} === `);
    });

const updateBinding = (id, data) => {
  API.updateBinding(id, data)
    .then(() => {
      console.log("=== Updated Document ===");
      listBindings();
    })
    .catch((e) => {
      console.log(`=== Error Below === `);
      console.log(`=== ${e} === `);
    });
};

const removeBinding = (id) =>
  API.removeBinding(id)
    .then(() => {
      console.log("=== Document Removed ===");
      listBindings();
    })
    .catch((e) => {
      console.log(`=== Error Below === `);
      console.log(`=== ${e} === `);
    });

// Other Functions

const handlePlayAudio = async (current_channel, user_id) => {
  // add in the 2nd audio assign option
  let bound_user = bound_users.find((item) => item.user_id === user_id);
  if (bound_user) {
    await current_channel.join().then((connection) => {
      let alt_audio =
        bound_user.audio_clip_name_2 === undefined
          ? false
          : Math.random() < bound_user.chance_of_occurrence;
      connection
        .play(
          path.join(
            __dirname,
            alt_audio === false
              ? `./media/${bound_user.audio_clip_name}`
              : `./media/${bound_user.audio_clip_name_2}`
          )
        )
        .on("finish", () => {
          current_channel.leave();
        });
    });
  }
};

// On Server Ready
CLIENT.on("ready", () => {
  listBindings();
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

  if (MESSAGE.substring(0, 1) === ".") {
    // Setting User Intro On Or Off
    if (
      bound_users.find((item) => `.${item.toggle_phrase}` === MESSAGE) !==
      undefined
    ) {
      let data = bound_users.find(
        (item) => `.${item.toggle_phrase}` === MESSAGE
      );

      updateBinding(data.user_id, !data.enabled);

      message
        .reply(
          `${
            MESSAGE.slice(0, 1).toUpperCase() + MESSAGE.substring(1)
          } Greeting: ${data.enabled !== true ? "Enabled" : "Disabled"}`
        )
        .then(() => message.react(data.enabled !== true ? "✅" : "❌"));
    }

    // Binding Commands
    if (
      accepted_admins.find((item) => item === message.author.id) !== undefined
    ) {
      if (MESSAGE.substring(0, 5) === ".bind") {
        let split_message = MESSAGE.split(/[ ,]+/);

        if (
          split_message.length < 4 ||
          isNaN(split_message[1]) ||
          (split_message.length > 4 &&
            (isNaN(split_message[5]) || split_message.length < 5))
        ) {
          message.reply(
            `Binding should be formatted as:\n\n".bind [user_id] [audio_clip_name] [toggle_phrase]"\n\nOptionally you can add:\n\n"[audio_clip_name_2] [chance_of_occurrence]"`
          );
        } else {
          if (
            bound_users.find((item) => item.user_id === split_message[1]) ===
            undefined
          ) {
            let data = {
              user_id: split_message[1],
              audio_clip_name: split_message[2],
              toggle_phrase: split_message[3],
              enabled: true,
            };

            if (split_message.length > 4) {
              data = {
                ...data,
                audio_clip_name_2: split_message[4],
                chance_of_occurrence: split_message[5],
              };
            }

            createBinding(data);
            message.reply(`User has been bound.`);
          } else {
            message.reply(
              `User ID has already been bound to a voice clip. To reassign please first use:\n\n".unbind [user_id]"`
            );
          }
        }
      }

      if (MESSAGE.substring(0, 7) === ".unbind") {
        let split_message = MESSAGE.split(/[ ,]+/);

        if (split_message.length <= 1 || isNaN(split_message[1])) {
          message.reply(
            `Unbinding should be formatted as:\n\n".unbind [user_id]"`
          );
        } else {
          if (
            bound_users.find((item) => item.user_id === split_message[1]) !==
            undefined
          ) {
            removeBinding(split_message[1]);
            message.reply(`User has been unbound.`);
          } else {
            message.reply(
              `User ID is not in use and therefore cannot be unassigned."`
            );
          }
        }
      }

      // Other Commands
      if (MESSAGE === ".help") {
        message.reply(
          `List Of Current Greetings To Enable/Disable: ${bound_users.map(
            (item) => {
              return `\n User ID: ${item.user_id}, Audio Clip Name: ${
                item.audio_clip_name
              } ${
                item.audio_clip_name_2 !== undefined
                  ? `, Second Audio Clip Name: ${item.audio_clip_name_2}, Chance: ${item.chance_of_occurrence}`
                  : ""
              }`;
            }
          )}`
        );
      }

      if (MESSAGE === ".reload") {
        message.reply(`Updating Bindings...`).then(() => {
          listBindings();
        });
      }
    }
  }
});

// Voice Connection
CLIENT.on("voiceStateUpdate", async (oldMember, newMember) => {
  if (oldMember.channelID === null || oldMember.channelID === undefined) {
    handlePlayAudio(
      CLIENT.channels.cache.get(newMember.channelID),
      newMember.id
    );
  }
});

// Login Via Token
CLIENT.login(CONFIG.DISCORD_TOKEN);
