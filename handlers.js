import { fmt, link, bold } from "telegraf/format";

import { START_GIF_LINK, WEB_APP_URL } from "./constants.js";
import {
  LETSPLAY_KEYBOARD_EN,
  LETSPLAY_KEYBOARD_RU,
  MENU_KEYBOARD_EN,
  MENU_KEYBOARD_RU,
  SELECT_LANGUAGE_KEYBOARD,
} from "./keyboards.js";
import { LOCALES } from "./locales.js";
import { CACHE } from "./shared.js";

//TODO: make inline query support

export async function selectLanguage(ctx) {
  ctx.reply("Please select your preferred language:", {
    ...SELECT_LANGUAGE_KEYBOARD,
  });
}

export async function sendWelcomeMessage(ctx) {
  const locale = await getUserLocale(
    ctx.update.callback_query?.from.id || ctx.message.from.id
  );
  const firstName =
    ctx.update.callback_query?.from.first_name || ctx.message.from.first_name;

  if (locale === LOCALES.RU) {
    ctx.reply(
      fmt`🎉 Добро пожаловать в игру "Would you rather?"! 🎉

Приветствуем тебя, ${firstName}! В нашей игре тебя ждёт масса увлекательных вопросов, непростых выборов и бесконечного развлечения.
  
🤔 Что предпочтешь ты: летать на драконе или обладать невидимостью? 🐉💨
  
"Would You Rather?" - это игра, где ты сам решаешь, что для тебя важнее. Стань мастером принятия решений, зарабатывай очки, создавай свои вопросы и поднимайся на вершину лидерборда!
  
Наслаждайся игрой, веселись и почувствуй азарт соревнования! 🚀💥
  
Готов принять вызов? Нажимай на ссылку ниже и дай волю своим предпочтениям!`,
      MENU_KEYBOARD_RU
    );
  } else {
    ctx.reply(
      fmt`🎉 Welcome to the "Would you rather?" game! 🎉

Welcome, ${firstName}! Our game is full of exciting questions, tough choices, and endless entertainment.
      
🤔 What would you prefer: to fly on a dragon or to possess invisibility? 🐉💨
      
"Would You Rather?" is a game where you decide what matters most to you. Become a master of decision-making, earn points, create your own questions, and climb to the top of the leaderboard!
      
Enjoy the game, have fun, and feel the thrill of competition! 🚀💥
      
Are you ready to accept the challenge? Click the link below and let your preferences guide you!`,
      MENU_KEYBOARD_EN
    );
  }
}

export async function sendStartDefaultMessages(ctx) {
  await sendLetsPlayMessage(ctx);
  await sendWelcomeMessage(ctx);
}

export async function sendLetsPlayMessage(ctx) {
  const locale = await getUserLocale(
    ctx.update.callback_query?.from.id || ctx.message.from.id
  );

  let msg;
  if (locale === LOCALES.RU) {
    msg = await ctx.replyWithAnimation(START_GIF_LINK, {
      caption: link("🎮🎮🎮", WEB_APP_URL),
      ...LETSPLAY_KEYBOARD_RU.resize(),
    });
  } else {
    msg = await ctx.replyWithAnimation(START_GIF_LINK, {
      caption: link("🎮🎮🎮", WEB_APP_URL),
      ...LETSPLAY_KEYBOARD_EN.resize(),
    });
  }

  await ctx.unpinAllChatMessages(msg.message_id);
  await ctx.pinChatMessage(msg.message_id);
}

export async function sendHowToPlayMessage(ctx) {
  const locale = await getUserLocale(
    ctx.update.callback_query?.from.id || ctx.message.from.id
  );

  if (locale === LOCALES.RU) {
    ctx.reply(
      fmt`
🔴🔵  ${bold`Выберите свой путь`}: Погрузившись в игру, вам будет предложено два интригующих варианта на экране. Это могут быть как простые дилеммы, так и запутанные загадки.
  
🚫❓ ${bold`Нет правильных или неправильных ответов`}: Здесь нет верного решения! Всё зависит от того, что вы предпочитаете или находите наиболее интересным. Так что не стоит беспокоиться о том, что ваш выбор "правильный". 
  
🏆💰 ${bold`Зарабатывайте очки`}: Каждый раз, когда вы принимаете решение, вы зарабатываете очки. Они станут ключом к продвижению вверх по лидерборду и демонстрации вашего умения принимать решения. 
  
📊👀 ${bold`Проверьте проценты`}: После того, как вы сделали свой выбор, посмотрите, как он соотносится с выбором других игроков. Интересно узнать, где вы стоите по сравнению с остальными. 
  
🔢✖️ ${bold`Безумный стрик`}: Ваши очки могут умножаться в зависимости от вашей серии согласия или несогласия с большинством. Продолжайте сохранять эти серии, чтобы зарабатывать еще больше очков! 
  
⚡⌛ ${bold`Следите за энергией`}: Принятие решений требует энергии, которая будет восполняться со временем. Так что рассчитывайте свои действия и стратегии мудро. 
  
🏅🚀 ${bold`Поднимайтесь вверх в таблице лидеров`}: Соревнуйтесь с другими игроками и узнайте, где вы находитесь в рейтинге. Сможете ли вы стать настоящим чемпионом игры? 
  
🎨💡 ${bold`Создайте свои собственные вопросы`}: Чувствуете себя креативным? Вы можете предложить свои собственные вопросы для включения в игру! 
  
🎁🏆 ${bold`Эксклюзивные награды`}: Будьте среди первых пользователей, которые пройдут все вопросы, и вы получите особые подарки в качестве признания вашего достижения! Эти награды подчеркнут ваше самоотверженное стремление и мастерство в принятии решений. 
  
🎮🎉 ${bold`Наслаждайтесь игрой`}: И, самое главное, помните, что главное — это веселиться! Будь то размышления над трудными выборами или просто наслаждение странными вопросами, эта игра призвана принести вам удовольствие и дружественное соревнование. 
  
🔗 Так что, чего же вы ждете? ${link(
        "Позвольте приключениям в принятии решений начаться!",
        WEB_APP_URL
      )}
  `,
      {
        reply_markup: LETSPLAY_KEYBOARD_RU.reply_markup,
      }
    );
  } else {
    ctx.reply(
      fmt`🔴🔵  ${bold`Choose Your Path`}: As you dive into the game, you'll be presented with two intriguing options on the screen. These could be anything from simple dilemmas to mind-bending conundrums.

🚫❓ ${bold`No Right or Wrong`}: There are no correct answers here! It's all about what you prefer or find most interesting. So, don't stress about making the "right" choice.
    
🏆💰 ${bold`Earn Points`}: Every time you make a choice, you'll earn points. These points will be the key to climbing up the leaderboard and showcasing your decision-making skills.
    
📊👀 ${bold`Check the Percentages`}: After making your choice, see how it stacks up against what others have chosen. It's fascinating to see where you stand compared to the rest of the players.
    
🔢✖️ ${bold`Multiplier Madness`}: Your points can multiply based on your streak of agreeing or disagreeing with the majority. Keep those streaks going to rack up even more points!
    
⚡⌛ ${bold`Watch Your Energy`}: Making choices requires energy, which will replenish over time. So, pace yourself and strategize wisely.
    
🏅🚀 ${bold`Climb the Leaderboard`}: Compete with other players and see where you rank on the leaderboard. Can you become the ultimate champion of the game?
    
🎨💡 ${bold`Create Your Own Questions`}: Feeling creative? You can suggest your own questions to be featured in the game!
    
🎁🏆 ${bold`Exclusive Rewards`}: Be among the first users to conquer all the questions, and you'll receive special gifts as a token of your achievement!
    
🎮🎉 ${bold`Enjoy the Game`}: Most importantly, remember to have a blast! Whether you're pondering tough choices or simply enjoying the quirky questions, this game is all about fun and friendly competition.
    
🔗 So, what are you waiting for? ${link(
        "Let the decision-making adventures begin!",
        WEB_APP_URL
      )}
    `,
      {
        reply_markup: LETSPLAY_KEYBOARD_EN.reply_markup,
      }
    );
  }
}

export async function getUserLocale(userId) {
  if (CACHE[userId]) {
    return CACHE[userId];
  }
  const res = await fetch(
    `https://wouldyoudora.xyz/api/locale/?userId=${userId}`
  );
  const data = await res.json();
  return data.locale;
}
