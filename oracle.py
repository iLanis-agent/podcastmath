import json, math

def tenths(x):
    return math.floor(x * 10 + 0.5) / 10

def fixed1(x):
    return f"{tenths(x):.1f}"

def speed_word(speed):
    return f"{tenths(speed)}x"

def drain_truth(backlog, listen, speed):
    covered = tenths(listen * speed)
    weeks = tenths(backlog / covered)
    word = "week" if weeks == 1 else "weeks"
    return (f"{fixed1(listen)} listening hours a week at {speed_word(speed)} covers "
            f"{fixed1(covered)} content hours, so a {fixed1(backlog)}-hour backlog "
            f"drains in {weeks:.1f} {word}.")

def queue_truth(new, listen, speed):
    covered = tenths(listen * speed)
    diff = tenths(covered - new)
    if diff > 0:
        return (f"Shows add {fixed1(new)} hours a week and you cover {fixed1(covered)}, "
                f"so the queue shrinks by {diff:.1f} hours a week.")
    if diff < 0:
        return (f"Shows add {fixed1(new)} hours a week and you cover {fixed1(covered)}, "
                f"so the queue grows by {abs(diff):.1f} hours a week - the fix is fewer "
                f"subscriptions, not more guilt.")
    return (f"Shows add {fixed1(new)} hours a week and you cover {fixed1(covered)}, "
            f"so the queue holds exactly steady - one skipped episode breaks the tie.")

def episode_truth(ep, avail, speed):
    covered = tenths(avail * speed)
    if covered >= ep:
        spare = tenths(covered - ep)
        return (f"At {speed_word(speed)} the {ep}-minute episode takes "
                f"{tenths(ep / speed):.1f} minutes, so you finish with {spare:.1f} "
                f"minutes to spare.")
    left = tenths(ep - covered)
    pct = tenths(covered / ep * 100)
    return (f"At {speed_word(speed)} you get {pct:.1f}% through the {ep}-minute episode, "
            f"leaving {left:.1f} minutes for the drive home.")

cases = []
for b, l, s in [(40, 7, 1.5), (10, 5, 1), (60, 4, 2), (25, 2, 1.75), (7, 7, 1)]:
    cases.append({"fn": "drainTruth", "args": [b, l, s], "expected": drain_truth(b, l, s)})
for n, l, s in [(3, 7, 1.5), (12, 7, 1.5), (10.5, 7, 1.5), (5, 3, 2), (8, 4, 1)]:
    cases.append({"fn": "queueTruth", "args": [n, l, s], "expected": queue_truth(n, l, s)})
for e, a, s in [(47, 30, 1.5), (45, 30, 1.5), (60, 20, 2), (22, 30, 1), (90, 25, 1.25)]:
    cases.append({"fn": "episodeTruth", "args": [e, a, s], "expected": episode_truth(e, a, s)})

with open("expected.json", "w") as f:
    json.dump(cases, f, indent=2)
    f.write("\n")
print(len(cases), "cases written")
