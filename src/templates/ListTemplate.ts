import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList{
    static instance: ListTemplate = new ListTemplate();

    ul: HTMLUListElement

    private constructor(){
        //select the ul with the id named 'listItems' that is seen in the index.html file
        this.ul = document.getElementById("listItems") as HTMLUListElement;
    }

    clear(): void {
        //clear out inner text in the dom for selected ul element
        this.ul.innerHTML = "";
    }

    render(fullList: FullList): void {
        this.clear();
        fullList.list.forEach((item) => {
            //create li parent element
            const li = document.createElement("li") as HTMLLIElement;
            li.className = "item";

            //create input checkbox child element
            const input = document.createElement("input") as HTMLInputElement;
            input.type = "checkbox";
            input.id = item.id;
            input.checked = item.checked;
            li.appendChild(input);
            //add event listener for when checkbox in changed
            input.addEventListener('change', () => {
                item.checked = !item.checked;
                fullList.save();
            })

            //create label element
            const label = document.createElement("label") as HTMLLabelElement;
            label.htmlFor = item.id;
            label.textContent = item.item;
            li.appendChild(label);

            //create button element
            const button = document.createElement("button") as HTMLButtonElement;
            button.className = "button"
            button.textContent = "X";
            li.append(button)
            //add event listener for removing list item
            button.addEventListener("click", () => {
                fullList.removeItem(item.id);
                this.render(fullList);
            })

            this.ul.append(li);
        })
    }
}