const type = document.getElementById('type')
var myinterval = null
var ID = 0
let Intervals = []
var node = null

// Function to create a div
function creatediv(cls) {
    const div = document.createElement('div')
    div.className = cls
        // Applying css to different divs
    if ("timer-" == cls.substring(0, cls.length - 1)) {
        div.style.marginLeft = '10px'
        div.style.padding = '10px'
        div.style.border = 'none'
        div.style.borderRadius = '10%'
        div.style.display = 'flex'
        div.style.flexDirection = 'column'
        div.style.justifyContent = 'center'
        div.style.width = '480px'
        div.style.height = '40vh'
        div.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'
    } else if ("date-time-" == cls.substring(0, cls.length - 1)) {
        div.style.display = 'flex'
        div.style.paddingBottom = '10px'
    } else if ("entry-" == cls.substring(0, cls.length - 1)) {
        div.style.margin = 'auto'
    }
    return div
}

// function to creat input
function createInput(id, count) {
    const inp = document.createElement('input')
    inp.type = 'text'
    inp.value = '0'
    inp.id = id + "-" + count
    inp.readOnly = true
    inp.style.display = 'block'
    inp.style.width = '80px'
    inp.style.height = '50px'
    inp.style.border = 'none'
    inp.style.borderRadius = '10%'
    inp.style.fontSize = '40px'
    inp.style.textAlign = 'center'
    return inp
}

// function to apply style to inputs of day, hour, min, sec
function setStyle(element) {
    element.style.textAlign = 'left'
    element.style.margin = '10px'
    element.style.borderRadius = '4%'
    element.style.width = '70%'
    element.style.height = '30px'
    element.style.fontSize = '20px'
}

// Creating buttons
function createButton(text, count) {
    const btn = document.createElement('button')
    btn.appendChild(document.createTextNode(text))
    btn.type = "button"
    btn.title = `Click to ${text}`
    btn.id = text + "-" + count
    document.querySelectorAll(`div.btndiv-${count}`).forEach(div => {
        div.appendChild(btn)
    })
}

// Creating Start button
const btn = document.createElement('button')
btn.id = 'Start'
btn.title = 'Click to Start Countdown'
btn.appendChild(document.createTextNode('Start'))

// Creating Image
const img = document.createElement('img')
img.src = 'hand.png'
img.id = 'hand'
img.width = 30
img.height = 45


// Adding btn and image to overlay div
document.querySelectorAll('div.overlay').forEach(element => {
    element.appendChild(btn)
    element.appendChild(img)
})

// Creating countdown window
function createDCT(count) {
    // Timer div
    const timerdiv = creatediv(`timer-${count}`)
    document.querySelectorAll('div.overlay').forEach(div => {
        div.appendChild(timerdiv)
    })


    // H1 and h2
    var h1 = document.createElement('h1')
    const name = document.createTextNode("Coutdown Timer")
    h1.appendChild(name)
    var h2 = document.createElement('h1')
    h2.id = `CC-${count}`
    h2.className = `CC-${count}`
    h2.style.color = "lightgreen"
    h2.style.position = 'relative'
    h2.style.paddingBottom = '0px'
    h2.style.animationName = 'slide'
    h2.style.animationDuration = '1s'
    h2.style.animationIterationCount = 'infinite'


    // Date-Time Div
    const datetime = creatediv(`date-time-${count}`)
    datetime.style.display = 'flex'
    paddingBottom = '10px'


    const headingDiv = creatediv(`heading-${count}`)
    datetime.style.display = 'flex'

    // Col Div
    const coldiv = creatediv(`col-${count}`)
    coldiv.style.display = 'flex'
    coldiv.style.textAlign = 'center'

    // Btn Creation
    const btndiv = creatediv(`btndiv-${count}`)
    coldiv.style.display = 'flex'

    // Date
    const inpDate = document.createElement('input')
    inpDate.type = "date"
    inpDate.title = "Select Date"
    inpDate.id = `date-${count}`
    setStyle(inpDate)

    // Time
    const inpTime = document.createElement('input')
    inpTime.type = "time"
    inpTime.title = "Select Time"
    inpTime.id = `time-${count}`
    setStyle(inpTime)

    // Lable
    // add h1, datetime, coldiv, btndiv
    document.querySelectorAll(`div.timer-${count}`).forEach(div => {
        div.appendChild(headingDiv)
        div.appendChild(h1)
        div.appendChild(datetime)
        div.appendChild(coldiv)
        div.appendChild(btndiv)
    })

    document.querySelectorAll(`div.heading-${count}`).forEach(div => {
            console.log(div)
            div.appendChild(h2)
        })
        // add inpdate, inptime.
    document.querySelectorAll(`div.date-time-${count}`).forEach(div => {
        div.appendChild(inpDate)
        div.appendChild(inpTime)
    })

    const lbltext = ["Day", "Hour", "Minutes", "Seconds"]
    const lblnode = []
        // Creating lbl and entry
    for (let i = 0; i < 4; i++) {
        var lbl = document.createElement('label')
        lbl.appendChild(document.createTextNode(lbltext[i]))
        lbl.style.color = 'black'
        lblnode.push(lbl)
        document.querySelectorAll(`div.col-${count}`).forEach(div => {
            div.appendChild(creatediv(`entry-${count}`))
        })
    }
    var divs = document.querySelectorAll(`div.entry-${count}`)
    for (let i = 0; i < 4; i++) {
        divs[i].appendChild(createInput(lbltext[i], count))
        divs[i].appendChild(lblnode[i])
    }

    createButton("Start", count)
    createButton("Stop", count)
    createButton("Restart", count)
    createButton("Exit", count)
    document.getElementById(`Stop-${count}`).onclick = function() {
        let id = parseInt(String(this.id).split("-")[1])
        Stop(id)
    }
    document.getElementById(`Restart-${count}`).onclick = function() {
        document.getElementById(`time-${count}`).value = null
        document.getElementById(`date-${count}`).value = null
        document.getElementById(`Day-${count}`).value = "0"
        document.getElementById(`Hour-${count}`).value = "0"
        document.getElementById(`Minutes-${count}`).value = "0"
        document.getElementById(`Seconds-${count}`).value = "0"
        try {
            const Id = ParseInt(String(this.id).split("-")[1])
            let Interval = Intervals.find(t => t.id == Id)
            if (Interval)
                Interval.Running = false
        } catch (err) {}
        document.querySelectorAll(`h1.CC-${count}`).forEach(item => {
            item.removeChild(node)
        })
    }
    document.getElementById(`Exit-${count}`).onclick = function() {
        const Id = String(this.id).split("-")[1]
        document.querySelectorAll(`div.timer-${Id}`).forEach(element => {
            element.remove()
            ID--
        })
        if (ID == 0) {
            document.querySelectorAll('div.overlay').forEach(element => {
                element.appendChild(btn)
                element.appendChild(img)
            })
            document.querySelector('div.overlay').style.display = 'flex'
            try {
                document.querySelector(`h1.CC-${Id}`).removeChild(node)
            } catch (err) {}
        }
    }
    document.getElementById(`Start-${count}`).onclick = function() {
        countdown(count)
    }
}

function countdown(id) {
    let Interval = Intervals.find(t => t.id == id)
    if (!Interval) {
        Interval = {
            id,
            interval: null,
            Running: false,
        }
        Intervals.push(Interval)
    }
    if (!Interval.Running) {
        Interval.Running = true
        Interval.interval = setInterval(() => {
            const date = document.getElementById(`date-${id}`).value
            const time = document.getElementById(`time-${id}`).value
            const enddate = new Date(date + " " + time)
            const currdate = new Date()
            if (enddate == "Invalid Date") {
                alert("Sir! Please select date and time.")
                clearInterval(Interval.interval)
                Interval.Running = false
                return
            }
            if (currdate >= enddate) {
                node = document.createTextNode("Countdown Completed Sir!")
                node.id = `Node-${id}`
                document.querySelectorAll(`h1.CC-${id}`).forEach(element => {
                    element.appendChild(node)
                })
            }
            const diff = (enddate - currdate) / 1000
            if (diff < 0) {
                clearInterval(Interval.interval)
                Interval.Running = false
                return
            }
            document.getElementById(`Day-${id}`).value = (Math.floor(diff / 3600 / 24))
            document.getElementById(`Hour-${id}`).value = (Math.floor((diff / 3600) % 24))
            document.getElementById(`Minutes-${id}`).value = (Math.floor((diff / 60) % 60))
            document.getElementById(`Seconds-${id}`).value = (Math.floor(diff) % 60)
        }, 1000);
    }
}

function Stop(id) {
    let Interval = Intervals.find(t => t.id == id)
    console.log(Interval, id)
    if (Interval) {
        clearInterval(Interval.interval)
        Interval.Running = false
    }

}

document.getElementById('Start').onclick = function() {
    document.querySelector('button#Start').remove()
    document.querySelector('img').remove()
    document.querySelector('div.overlay').style.display = 'grid'
    document.querySelector('div.overlay').style.gridTemplateRows = '360px 360px'
    document.querySelector('div.overlay').style.gridTemplateColumns = '500px 500px 500px'
    for (let i = 0; i < 6; i++) {
        ID++
        createDCT(ID)
    }
}