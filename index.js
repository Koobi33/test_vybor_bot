import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import {
  selectLanguage,
  sendWelcomeMessage,
  sendHowToPlayMessage,
  sendLetsPlayMessage,
} from "./handlers.js";
import { CACHE } from "./shared.js";
import { WEB_APP_URL } from "./constants.js";
import { MENU_KEYBOARD_EN } from "./keyboards.js";

const MENU_BUTTON_RU = {
  type: "web_app",
  text: "🎮 Играть",
  web_app: {
    url: WEB_APP_URL,
  },
};
const MENU_BUTTON_EN = {
  type: "web_app",
  text: "🎮 Play",
  web_app: {
    url: WEB_APP_URL,
  },
};

const bot = new Telegraf(process.env.BOT_TOKEN);

//TODO: start
//TODO: info / menu
//TODO: generate share link
//TODO: report /support
//TODO: faq

bot.start(selectLanguage);

bot.action("english", async (ctx) => {
  ctx.setChatMenuButton(MENU_BUTTON_EN);
  CACHE[ctx.update.callback_query.from.id] = "en";
  //TODO: POST LOCALE TO THE BACKEND
  ctx.deleteMessage(ctx.message_id);
  await sendLetsPlayMessage(ctx);
  await sendWelcomeMessage(ctx);
});

bot.action("russian", async (ctx) => {
  ctx.setChatMenuButton(MENU_BUTTON_RU);
  CACHE[ctx.update.callback_query.from.id] = "ru";
  //TODO: POST LOCALE TO THE BACKEND
  ctx.deleteMessage(ctx.message_id);
  await sendLetsPlayMessage(ctx);
  await sendWelcomeMessage(ctx);
});

bot.command("howtoplay", (ctx) => {
  sendHowToPlayMessage(ctx);
});
bot.action("howtoplay", (ctx) => {
  sendHowToPlayMessage(ctx);
});

bot.command("menu", (ctx) => {
  sendWelcomeMessage(ctx);
});

bot.on(message("pinned_message"), (ctx) => ctx.deleteMessage(ctx.message_id));

bot.launch();
