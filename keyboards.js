import { Markup } from "telegraf";
import {
  TELEGRAM_CHANNEL_EN,
  TELEGRAM_CHANNEL_RU,
  WEB_APP_URL,
} from "./constants.js";

export const MENU_KEYBOARD_EN = Markup.inlineKeyboard([
  [Markup.button.webApp("🎮 Play", WEB_APP_URL)],
  [Markup.button.url("Join community", TELEGRAM_CHANNEL_EN)],
  [Markup.button.callback("How to play?", "howtoplay")],
  //   [
  //     Markup.button.switchToChat(
  //       "share",
  //       `r_${ctx.update.callback_query.from.id}`
  //     ),
  //   ],
]);

export const MENU_KEYBOARD_RU = Markup.inlineKeyboard([
  [Markup.button.webApp("🎮 Играть", WEB_APP_URL)],
  [Markup.button.url("Присоединиться к сообществу", TELEGRAM_CHANNEL_RU)],
  [Markup.button.callback("Как играть?", "howtoplay")],
  //   [
  //     Markup.button.switchToChat(
  //       "share",
  //       `r_${ctx.update.callback_query.from.id}`
  //     ),
  //   ],
]);

export const SELECT_LANGUAGE_KEYBOARD = Markup.inlineKeyboard([
  [Markup.button.callback("English", "english")],
  [Markup.button.callback("Русский", "russian")],
]);

export const LETSPLAY_KEYBOARD_EN = Markup.inlineKeyboard([
  [Markup.button.webApp("🎮 Play", WEB_APP_URL)],
]);

export const LETSPLAY_KEYBOARD_RU = Markup.inlineKeyboard([
  [Markup.button.webApp("🎮 Играть", WEB_APP_URL)],
]);
