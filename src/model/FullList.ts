import ListItem from "./ListItem";

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
}

export default class FullList implements List {
    static instance: FullList = new FullList();

    private constructor(private _list: ListItem[] = []){}

    get list(): ListItem[] {
        return this._list;
    }

    load(): void {
        //Retrieve everything from 'localStorage' if available, if not null
        const storedList: string | null = localStorage.getItem("myList");
        
        //if there is nothing/null in 'localStorage' then do not load anything. 
        if (typeof storedList !== "string") {
            return 
        }

        //parse stored list and save in variable called 'parsedList'
        const parsedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(storedList);

        //For each item in 'parsedList' create a new ListItem object and add it to the FullList instance 
        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
            FullList.instance.addItem(newListItem);
        })
    }

    save(): void {
        //save _list in 'localStorage' under "myList"
        localStorage.setItem("myList", JSON.stringify(this._list));
    }

    clearList(): void {
        //set _list to an empty array 
        this._list = [];
        //save changes in 'localStorage'
        this.save();
    }

    addItem(itemObj: ListItem): void {
        //push itemObj to _list 
        this._list.push(itemObj);
        //save changes in 'localStorage'
        this.save();
    }

    removeItem(id: string): void {
        //return back _list with id to remove
        this._list = this._list.filter(item => item.id !== id);
        //save changes in 'localStorage'
        this.save();
    }
}