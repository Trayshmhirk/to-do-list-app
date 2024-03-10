import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {
   const fullList = FullList.instance;
   const listTemplate = ListTemplate.instance;
   const itemEntryForm = document.getElementById(
      "itemEntryForm"
   ) as HTMLFormElement;

   itemEntryForm.addEventListener("submit", (e): void => {
      e.preventDefault();

      //
      const input = document.getElementById("newItem") as HTMLInputElement;
      const newEntryText: string = input.value.trim();
      if (!newEntryText.length) return;

      const itemID: number = fullList.list.length
         ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
         : 1;
      const newItem = new ListItem(itemID.toString(), newEntryText);

      //
      fullList.addItem(newItem);
      listTemplate.render(fullList);
      input.value = "";
   });

   const clearItemsButton = document.getElementById(
      "clearItemsButton"
   ) as HTMLButtonElement;
   clearItemsButton.addEventListener("click", (): void => {
      fullList.clear();
      listTemplate.clear();
   });

   fullList.load();
   listTemplate.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
