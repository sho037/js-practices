#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

main();

function main() {
  const now = dayjs().locale("ja");

  const options = minimist(process.argv.slice(2));

  if (options.y && !options.m) {
    console.error("y オプションのみは対応していません");
    process.exit(1);
  }

  const specified_date = now
    .month((options.m || now.format("M")) - 1)
    .year(options.y || now.format("YYYY"));

  printCalendarHeader(
    specified_date.format("M"),
    specified_date.format("YYYY"),
  );

  printCalendarBody(
    specified_date.startOf("M"),
    specified_date.endOf("M"),
    specified_date.format("YYYY") === now.format("YYYY") &&
      specified_date.format("M") === now.format("M"),
    now,
  );
}

function printCalendarHeader(month, year) {
  console.log(`      ${month}月 ${year}`);
  console.log(`日 月 火 水 木 金 土`);
}

function printCalendarBody(first_date, last_date, is_this_month, now) {
  for (let i = 0; i < Number(first_date.format("d")); i++) {
    process.stdout.write("   ");
  }

  for (let i = 1; i <= Number(last_date.format("D")); i++) {
    const current_date = first_date.date(i);

    if (is_this_month) {
      process.stdout.write(
        convertDayColor(
          current_date.format("YYYY"),
          current_date.format("M"),
          i,
          now,
        ) + " ",
      );
    } else {
      process.stdout.write(i.toString().padStart(2, " ") + " ");
    }

    if (current_date.format("d") === "6") {
      process.stdout.write("\n");
    }
  }

  process.stdout.write("\n");
  if (last_date.format("d") !== "0") process.stdout.write("\n");
}

function convertDayColor(year, month, day, now) {
  const date = dayjs(new Date(year, Number(month) - 1, day));
  const day_str = day.toString().padStart(2, " ");
  if (date.date() === now.date()) {
    return `\x1b[7m${day_str}\x1b[0m`;
  } else {
    return day_str;
  }
}
