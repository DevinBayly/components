import * as d3 from "d3"


export let progressBar = () => {
    let ob = {}
    ob.setData = (data) => {
        ob.data = data
    }
    ob.configure = (height, width, margin) => {
        ob.height = height
        ob.width = width
        ob.margin = margin
    }

    ob.make = () => {
        console.log("making bar")
        ob.svg = d3.select("#target").append("svg")
        ob.svg.attr("height", ob.height)
        ob.svg.attr("width", ob.width)
        ob.xscale = d3.scaleLinear()
        let values = ob.data.circles.map(e => e.value)
        console.log(values)
        ob.xscale.domain([Math.min(...values), Math.max(...values)])
        ob.xscale.range([0, ob.width - 2 * (ob.margin + ob.data.circleRad)])
        ob.rectscale = d3.scaleLinear()
        ob.rectscale.domain([1, values.length])
        ob.rectscale.range(ob.xscale.range())

        ob.rectgroup = ob.svg.append("g")
        // x is margin + Radius
        // y is R - rectheight/2
        ob.rectgroup.attr("transform", `translate(${ob.margin + ob.data.circleRad},${ob.height / 2 - ob.data.rectheight / 2})`)
        ob.rectangle = ob.rectgroup.selectAll("rect").data(ob.data.rect).enter().append("rect")
        ob.rectangle.attr("x", 0)
        ob.rectangle.attr("width", d => {
            console.log("rect val", d);
            return ob.rectscale(d)
        })
        ob.rectangle.attr("height", ob.data.rectheight)
        ob.circlegroup = ob.svg.append("g")
        ob.circles = ob.circlegroup.selectAll("circle").data(ob.data.circles).enter().append("circle")
        ob.circlegroup.attr("transform", `translate(${ob.data.circleRad + ob.margin},${ob.height / 2})`)
        ob.circles.attr("cx", d => ob.xscale(d.value))
        ob.circles.attr("r", d => ob.data.circleRad)
        ob.circles.attr("fill", "transparent")
        ob.circles.attr("stroke-width", 2)
        ob.circles.attr("stroke", "black")
        ob.circles.on("click",function(d){ 
            console.log("circle clicked",d)
            // do the visual updates with the barState
            ob.actionCallback(d.value)
        })

    }
    ob.actionCallback = ()=>{
        alert("action connection not defined")
    }

    ob.update = (newdata) => {
        // redraw the rectangle
        console.log("in update")
        ob.data = newdata
        ob.rectangle.data(ob.data.rect).transition().attr("width",d=> {
            console.log("new rectval il",d)
            return ob.rectscale(d)
        })
    }


    return ob
}


export let barState = () => {
    let ob = {}
    ob.data = {
        circles: [],
        circleRad: 5,
        rectheight: 2,
        rect: [3]
    }
    ob.createCircles = (n) => {
        let circles = []
        for (let i = 0; i < n; i++) {
            circles.push({ value: i })
        }
        ob.data.circles = circles
    }
    ob.notifybind = (f)=> {
        return ()=> {
            f()
            ob.notifyBars()
        }
    }
    ob.set = ob.notifybind((i) => {
        ob.data.rect[0] = i
    })
    // bind with notify by default
    ob.forward = ob.notifybind(() => {
        console.log("progressing")
        ob.data.rect[0] += 1
    })
    ob.backward = ob.notifybind(() => {
        console.log("regressing")
        ob.data.rect[0] -= 1
    })
    ob.setBar =(bar) => {
        ob.bar = bar
    } 
    ob.notifyBars = ()=> {
        console.log("calling update function in bar ")
        if (ob.bar) {
            ob.bar.update(ob.data)
        }
    }
    return ob
}

let lkeytrigger = () => {
    let ob = {}
    // change for document ob later
    // it is a subject kind of thing
    ob.functions = []
    ob.register = (f)=> {
        ob.functions.push(f)
    }
    ob.initListener = () => {
        document.body.addEventListener("keydown", (e) => {
            console.log("e pres",e.key)
            if (e.key == "ArrowLeft") {
                ob.callAllRegistered()
            }
        })
    }
    ob.callAllRegistered = ()=> {
        for (let f of ob.functions) {
            f()
        }
    }
    return ob
}
let rkeytrigger = () => {
    let ob = {}
    // change for document ob later
    // it is a subject kind of thing
    ob.functions = []
    ob.register = (f)=> {
        ob.functions.push(f)
    }
    ob.initListener = () => {
        document.body.addEventListener("keydown", (e) => {
            console.log("e pres",e.key)
            if (e.key == "ArrowRight") {
                ob.callAllRegistered()
            }
        })
    }
    ob.callAllRegistered = ()=> {
        for (let f of ob.functions) {
            f()
        }
    }
    return ob
}
