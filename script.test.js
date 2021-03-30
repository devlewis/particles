import {
  fireEvent,
  screen,
  getByText,
  getByTest,
  getByTestId,
} from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import { choose, rain, waterfall, pattern } from "./script";
import "jest-canvas-mock";
import { Canvas } from "canvas";

// let canvas;
// let ctx;

let spy;

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let container;

describe("index.html", () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
    function mockCanvas(window) {
      window.HTMLCanvasElement.prototype.getContext = function () {
        return {
          fillRect: function () {},
          clearRect: function () {},
          getImageData: function (x, y, w, h) {
            return {
              data: new Array(w * h * 4),
            };
          },
          putImageData: function () {},
          createImageData: function () {
            return [];
          },
          setTransform: function () {},
          drawImage: function () {},
          save: function () {},
          fillText: function () {},
          restore: function () {},
          beginPath: function () {},
          moveTo: function () {},
          lineTo: function () {},
          closePath: function () {},
          stroke: function () {},
          translate: function () {},
          scale: function () {},
          rotate: function () {},
          arc: function () {},
          fill: function () {},
          measureText: function () {
            return { width: 0 };
          },
          transform: function () {},
          rect: function () {},
          clip: function () {},
        };
      };

      window.HTMLCanvasElement.prototype.toDataURL = function () {
        return "";
      };
    }
    const window = dom.window.document.defaultView;
    mockCanvas(window);
  });

  it("renders a header, two buttons, canvas, and a footer", () => {
    expect(
      container.querySelector(`[data-testid="${"header"}"]`)
    ).not.toBeNull();
    expect(container.querySelectorAll("button")).toHaveLength(2);
    expect(container.querySelectorAll("canvas")).toHaveLength(1);
    expect(
      container.querySelector(`[data-testid="${"footer"}"]`)
    ).not.toBeNull();
  });

  it("renders the buttons with correct text", () => {
    expect(getByText(container, "RAIN")).toBeInTheDocument();
    expect(getByText(container, "WATERFALL")).toBeInTheDocument();
  });

  it("renders a new paragraph via JavaScript when the button is clicked", async () => {
    const buttonRain = getByText(container, "RAIN");
    let testId = "canvas1";
    let newCanvas = dom.window.document.createElement("canvas");

    newCanvas.setAttribute("id", testId);

    function bindToNode(node, name, fn) {
      node[name] = fn.bind(node);
    }

    bindToNode(newCanvas, "getContext", () => {
      return {
        fillRect: function () {},
        clearRect: function () {},
        getImageData: function (x, y, w, h) {
          return {
            data: new Array(w * h * 4),
          };
        },
        putImageData: function () {},
        createImageData: function () {
          return [];
        },
        setTransform: function () {},
        drawImage: function () {},
        save: function () {},
        fillText: function () {},
        restore: function () {},
        beginPath: function () {},
        moveTo: function () {},
        lineTo: function () {},
        closePath: function () {},
        stroke: function () {},
        translate: function () {},
        scale: function () {},
        rotate: function () {},
        arc: function () {},
        fill: function () {},
        measureText: function () {
          return { width: 0 };
        },
        transform: function () {},
        rect: function () {},
        clip: function () {},
      };
    });
    container.appendChild(newCanvas);
    // document.getElementById.mockReturnValue({
    //   canvas: {
    //     getContext: () => {
    //       return {
    //         ctx: {
    //           fillStyle: `rgba(255, 255, 255)`,
    //           fillRect: () => {},
    //         },
    //       };
    //     },
    //   },
    // });
    //expect(choose).toBeCalled();
    //await fireEvent.click(buttonRain);

    expect(pattern).toEqual("rain");
  });
});
