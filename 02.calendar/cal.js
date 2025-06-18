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
    now,
  );
}

function printCalendarHeader(month, year) {
  console.log(`      ${month}月 ${year}`);
  console.log(`日 月 火 水 木 金 土`);
}

function printCalendarBody(first_date, last_date, now) {
  for (let i = 0; i < Number(first_date.format("d")); i++) {
    process.stdout.write("   ");
  }

  for (let i = 1; i <= Number(last_date.format("D")); i++) {
    const current_date = first_date.date(i);

    process.stdout.write(formatDay(current_date, now) + " ");

    if (current_date.format("d") === "6") {
      process.stdout.write("\n");
    }
  }

  process.stdout.write("\n");
  if (last_date.format("d") !== "0") process.stdout.write("\n");
}

function formatDay(date, now) {
  const day_str = date.date().toString().padStart(2, " ");
  if (date.isSame(now, "date")) {
    return `\x1b[7m${day_str}\x1b[0m`;
  }

  return day_str;
}
