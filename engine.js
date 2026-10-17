// Podcast Math engine - backlog, queue and episode honesty.
// Pure counting arithmetic over the user's own numbers; no listening advice.

function assertPositive(value, label) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(label + " must be above zero");
  }
}

function tenths(x) {
  return Math.floor(x * 10 + 0.5) / 10;
}

function fixed1(x) {
  return tenths(x).toFixed(1);
}

function speedWord(speed) {
  return fixed1(speed) + "x";
}

// The drain truth: listening hours times speed is the honest exchange rate.
function drainTruth(backlogHrs, listenHrsWeek, speed) {
  assertPositive(backlogHrs, "the backlog");
  assertPositive(listenHrsWeek, "the weekly listening");
  assertPositive(speed, "the speed");
  const covered = tenths(listenHrsWeek * speed);
  const weeks = tenths(backlogHrs / covered);
  const weekWord = weeks === 1 ? "week" : "weeks";
  return fixed1(listenHrsWeek) + " listening hours a week at " + speedWord(speed) +
    " covers " + fixed1(covered) + " content hours, so a " + fixed1(backlogHrs) +
    "-hour backlog drains in " + weeks.toFixed(1) + " " + weekWord + ".";
}

// The queue truth: compare publish rate to covered rate, like for like.
function queueTruth(newHrsWeek, listenHrsWeek, speed) {
  assertPositive(newHrsWeek, "the new shows");
  assertPositive(listenHrsWeek, "the weekly listening");
  assertPositive(speed, "the speed");
  const covered = tenths(listenHrsWeek * speed);
  const diff = tenths(covered - newHrsWeek);
  if (diff > 0) {
    return "Shows add " + fixed1(newHrsWeek) + " hours a week and you cover " +
      fixed1(covered) + ", so the queue shrinks by " + diff.toFixed(1) + " hours a week.";
  }
  if (diff < 0) {
    return "Shows add " + fixed1(newHrsWeek) + " hours a week and you cover " +
      fixed1(covered) + ", so the queue grows by " + Math.abs(diff).toFixed(1) +
      " hours a week - the fix is fewer subscriptions, not more guilt.";
  }
  return "Shows add " + fixed1(newHrsWeek) + " hours a week and you cover " +
    fixed1(covered) + ", so the queue holds exactly steady - one skipped episode breaks the tie.";
}

// The episode truth: what fits in the time you actually have.
function episodeTruth(episodeMin, availableMin, speed) {
  assertPositive(episodeMin, "the episode");
  assertPositive(availableMin, "the available time");
  assertPositive(speed, "the speed");
  const covered = tenths(availableMin * speed);
  if (covered >= episodeMin) {
    const spare = tenths(covered - episodeMin);
    return "At " + speedWord(speed) + " the " + episodeMin + "-minute episode takes " +
      tenths(episodeMin / speed).toFixed(1) + " minutes, so you finish with " +
      spare.toFixed(1) + " minutes to spare.";
  }
  const left = tenths(episodeMin - covered);
  const pct = tenths((covered / episodeMin) * 100);
  return "At " + speedWord(speed) + " you get " + pct.toFixed(1) + "% through the " +
    episodeMin + "-minute episode, leaving " + left.toFixed(1) + " minutes for the drive home.";
}

if (typeof module !== "undefined") {
  module.exports = { drainTruth, queueTruth, episodeTruth, tenths, fixed1 };
}
