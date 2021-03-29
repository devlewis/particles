import { fireEvent, screen, getByText, getByTest } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import { choose, rain, waterfall } from "./script"
import "jest-canvas-mock"

let canvas;
let ctx;

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom;
let container;

describe('index.html', () => {
    beforeEach(() => {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(html, { runScripts: 'dangerously' })
        container = dom.window.document.body;
        canvas = document.createElement('canvas').id('canvas1');
        ctx = canvas.getContext('2d');
    })

    it('renders a header, two buttons, canvas, and a footer', () => {
        expect(container.querySelector(`[data-testid="${'header'}"]`)).not.toBeNull();
        expect(container.querySelectorAll('button')).toHaveLength(2);
        expect(container.querySelectorAll('canvas')).toHaveLength(1);
        expect(container.querySelector(`[data-testid="${'footer'}"]`)).not.toBeNull();

    })

    it('renders the buttons with correct text', () => {
        expect(getByText(container, 'RAIN')).toBeInTheDocument();
        expect(getByText(container, 'WATERFALL')).toBeInTheDocument()
    })

    it('renders a new paragraph via JavaScript when the button is clicked', async () => {
        const buttonRain = getByText(container, 'RAIN');
        await fireEvent.click(buttonRain);
        //expect(choose).toBeCalled();
        expect(rain).toBeCalled();

        // fireEvent.click(button)
        // generatedParagraphs = container.querySelectorAll('#pun-container p')
        // expect(generatedParagraphs.length).toBe(2)

        // fireEvent.click(button)
        // generatedParagraphs = container.querySelectorAll('#pun-container p')
        // expect(generatedParagraphs.length).toBe(3)
    })
})