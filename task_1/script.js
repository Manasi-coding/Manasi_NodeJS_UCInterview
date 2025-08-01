const getButton = document.querySelector("#generate");

getButton.addEventListener("click", () => {
    const input = document.querySelector("#name").value.trim();

    if (input.length === 0) {
        alert("Enter your name buddy!");
        return;
    }

    const firstFour = input.slice(0, 4);

    const lastNames = ["Geller", "Tribbiani", "Buffay", "Green", "Bing", "Wheeler", "Hannigan"];
    const select = lastNames[Math.floor(Math.random() * lastNames.length)];

    const nickname = `${firstFour} ${select}`;

    document.querySelector("#result").textContent = `Henceforth, you are: ${nickname}`;
});
