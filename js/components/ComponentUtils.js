
export class ComponentUtils {
    static createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.keys(attributes).forEach(key => {
            if (key.startsWith('on') && typeof attributes[key] === 'function') {
                element.addEventListener(key.slice(2).toLowerCase(), attributes[key]);
            } else if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'style' && typeof attributes[key] === 'object') {
                Object.assign(element.style, attributes[key]);
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });
        
        if (typeof content === 'string') {
            element.innerHTML = content;
        } else if (Array.isArray(content)) {
            content.forEach(child => {
                if (child instanceof HTMLElement) {
                    element.appendChild(child);
                } else if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                }
            });
        } else if (content instanceof HTMLElement) {
            element.appendChild(content);
        } else if (typeof content === 'string') {
            element.textContent = content;
        }
        
        return element;
    }

    static createButton(text, onClick, className = 'btn btn-primary') {
        return this.createElement('button', {
            className,
            onclick: onClick
        }, text);
    }

    static createInput(placeholder, id, type = 'text', className = 'form-input') {
        return this.createElement('input', {
            type,
            id,
            className,
            placeholder
        });
    }

    static createFormGroup(label, input) {
        return this.createElement('div', {
            className: 'form-group'
        }, [
            label ? this.createElement('label', {
                style: { display: 'block', marginBottom: '5px', fontWeight: '500' }
            }, label) : null,
            input
        ].filter(Boolean));
    }
}