function pageChange() {
    let elem = document.querySelectorAll(".elem");
    let allElemPage = document.querySelectorAll(".allElem");
    let backBtn = document.querySelectorAll(".close");
    elem.forEach((element) => {
        element.addEventListener("click", () => {
            allElemPage[element.id].style.display = "block";
        })
    });
    backBtn.forEach((element) => {
        element.addEventListener("click", () => {
            allElemPage[element.id].style.display = "none";
        })
    });
}
pageChange();



function todoApp() {
    // Form elements
    let formTask = document.querySelector("#main #left form input");
    let formDetail = document.querySelector("#main #left form textarea");
    let formBtn = document.querySelector("#main #left form button");
    let taskDisplay = document.querySelector("#main #right");

    // Task array
    let arr = [];

    // Render tasks
    function renderTasks() {
        taskDisplay.innerHTML = "";

        arr.forEach((item, index) => {
            taskDisplay.innerHTML += `
                <div class="task">
                    <h2>${item.task}</h2>
                    <button id="${index}">Mark as Complete</button>
                </div>
            `;
        });
    }

    // Load from localStorage
    if (localStorage.getItem("arr")) {
        arr = JSON.parse(localStorage.getItem("arr"));
        renderTasks();
    }

    // Add task
    formBtn.addEventListener("click", (e) => {
        e.preventDefault();

        let sum = {
            task: formTask.value,
            detail: formDetail.value
        };

        arr.push(sum);
        localStorage.setItem("arr", JSON.stringify(arr));

        renderTasks();

        formTask.value = "";
        formDetail.value = "";
    });

    // Mark as complete (remove task)
    taskDisplay.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            let index = e.target.id;

            arr.splice(index, 1);
            localStorage.setItem("arr", JSON.stringify(arr));

            renderTasks();
        }
    });
}
todoApp();



function dailyPlanner() {
    let time = []
    let planData = JSON.parse(localStorage.getItem("plan")) || {};
    let main = document.querySelector("#main2")

    for (let i = 0; i < 18; i++) {
        time.push(`${4 + i}:00-${5 + i}:00`)
    }



    time.forEach((timeSlot, index) => {
        main.innerHTML += `
    <div>
        <h3>${timeSlot}</h3>
        <input type="text" placeholder="..." value="${planData[index] || ""}">
    </div>
    `;
    });

    let input = document.querySelectorAll('#main2 div input')
    input.forEach((inp, index) => {
        inp.addEventListener("input", () => {
            planData[index] = inp.value;
            localStorage.setItem("plan", JSON.stringify(planData));
        });
    });
}
dailyPlanner();


function motivationQuote() {
    let quotePara = document.querySelector("#motivepara");
    let quoteAuthor = document.querySelector("#motivebox h3");
    async function fetchQuote() {
        let response = await fetch("https://dummyjson.com/quotes/random");
        let quote = await response.json();
        quotePara.innerHTML = `<i class="ri-double-quotes-l" id="quote-open"></i>${quote.quote}`;
        quoteAuthor.innerText = `--${quote.author}`;
    }
    fetchQuote();
}
motivationQuote();



function pomodoroTimer() {
    let display = document.querySelector("#timer h2");
    let startBtn = document.querySelector("#start");
    let pauseBtn = document.querySelector("#pause");
    let resetBtn = document.querySelector("#reset");
    let intervalTimer;
    let workSession = true;
    let totalSeconds = 25 * 60;
    function timer() {
        let minute = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        display.innerHTML = `${String(minute).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    function startTimer() {
        clearInterval(intervalTimer);
        intervalTimer = setInterval(function () {
            if (totalSeconds > 0) {
                totalSeconds--;
                timer();
            }
            else {
                clearInterval(intervalTimer);
                workSession = !workSession;
                display.innerHTML = workSession ? "Work Session!" : "Break Time!";
                totalSeconds = workSession ? 25 * 60 : 5 * 60;
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(intervalTimer);
    }

    function resetTimer() {
        clearInterval(intervalTimer);
        totalSeconds = 25 * 60;
        timer();
    }

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();


let apiKey = "c28f6e7790214b77058ad65d33f73403";
let city = "Surat";
let time = document.querySelector("#header1 #time");
let temp = document.querySelector("#header2 h3");
let date_time;
let date_display = document.querySelector("#header1 #date");

async function weatherAPI() {
    let apiUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    let real = await apiUrl.json();
    temp.innerHTML=`Temperature:${Math.floor(real.main.temp + 2)}°C`
    console.log()
}
weatherAPI();

function Time() {
    date_time = new Date
    let week = ["Sunday", "Monday", "Turesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = week[date_time.getDay()]
    let hours = date_time.getHours();
    let minutes = date_time.getMinutes();
    let seconds=date_time.getSeconds();
    let tarikh = date_time.getDate();
    let month = date_time.getMonth();
    let year = date_time.getFullYear();

    date_display.innerHTML = `Date:${String(tarikh).padStart(2, "0")}/${String(month).padStart(2, "0")}/${String(year)}`
    if (hours > 12) {
        time.innerHTML = `${day}, ${String(hours - 12).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} pm`
    }
    else {
        time.innerHTML = `${day}, ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} am`
    }
}

setInterval(Time,1000);
