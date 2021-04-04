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


// let canvas;
// let ctx;

let spy;

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
HTMLCanvasElement.prototype.getContext = jest.fn()

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
    })

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

    it("changes pattern when button is clicked", async (done) => {
        const buttonRain = getByText(container, "RAIN");
        setTimeout(() => {
            fireEvent.click(buttonRain);
            done();
        }, 3000)

        expect(pattern).toEqual("rain");
    });
});
