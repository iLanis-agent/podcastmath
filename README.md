# Podcast Math

Podcast backlog honesty. You are not behind on podcasts - you are behind on the arithmetic. Podcast Math counts the backlog, the queue and the episode against the time you actually have.

## What it computes

- **The drain truth** - listening hours per week times playback speed is the honest exchange rate; the backlog in weeks.
- **The queue truth** - new episode hours per week against covered hours: the queue shrinks, grows, or holds exactly steady, like for like.
- **The episode truth** - what one episode costs at your speed, and how much of it fits in the time you have.

## Boundary

Counting arithmetic only. Your numbers in, arithmetic out - no listening advice, no judgment about your taste or your time.

## Files

- `index.html` - landing page with the honesty pitch and the boundary.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic, shared by the app and the tests.
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json` (15 cases).
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/podcastmath/
Repo: https://github.com/iLanis-agent/podcastmath
