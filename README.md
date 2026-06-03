# Caesar Cipher

A Java implementation of the classic shift cipher, plus a JavaScript port with an interactive web demo.

**Live demo:** https://nabintousfofana.github.io/caesarcipher_project/

## What it does

The Caesar Cipher shifts every letter in a message forward by `n` positions, wrapping at the end of the alphabet. `HELLO` with `shift=3` becomes `KHOOR`. Spaces and punctuation pass through unchanged. Decryption is just encryption with the opposite shift, so you only need one algorithm.

I built the Java version first to practice the language properly — classes, packages, edge cases, tests. Then I ported the same algorithm to JavaScript and built a small web playground so the project is visible in my portfolio, not just a folder of `.java` files no one can run without cloning.

## What's inside

```
caesarcipher_project/
├── index.html              the web playground
├── script.js               JavaScript port of the algorithm
├── style.css
├── src/main/java/com/nabintou/caesarcipher/
│   ├── CaesarsCipher.java  the algorithm
│   ├── Main.java           runnable demo
│   └── Test.java           hand-rolled assertion tests
├── build.gradle.kts
└── settings.gradle.kts
```

## Features

**Java side:**
- Edge-case handling: negative shifts, non-letter characters, wrap-around with proper modulo math
- Full JavaDoc on the public methods
- 10 hand-rolled assertion tests (no JUnit dependency — I wanted to write the test runner myself for practice)

**Web demo side:**
- Type a message, drag the shift slider, watch the result update live
- An alphabet wheel that rotates as you change the shift — so you can see why `HELLO` becomes `KHOOR`
- Encrypt/decrypt swap button and copy-to-clipboard
- Cipher breaker that shows all 26 possible decryptions at once, with the most likely English ones highlighted

## Run the Java version

```bash
git clone https://github.com/NabintouSFofana/caesarcipher_project.git
cd caesarcipher_project
./gradlew run        # runs Main.java
./gradlew runTests   # runs the test class
```

## Run the web demo

Open `index.html` in your browser. No server needed.

## What I learned

Writing the same algorithm in Java and then JavaScript taught me how differently the two languages think about strings and characters. Java is strict about types; JavaScript will let you do almost anything. Building the visual wheel was harder than the cipher itself — the math is five lines, but the SVG that explains it took an afternoon. Worth it though: the wheel is the thing people remember about the demo.

## License

MIT — see [LICENSE](LICENSE).

---

Built by [Nabintou S. Fofana](https://nabintousfofana.github.io/portfolio/) · 2025
