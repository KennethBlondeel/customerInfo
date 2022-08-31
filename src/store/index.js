import { createStore } from "redux";

const Notify = (state = { messages: [] }, action) => {
  const titles = document.getElementsByClassName("card-title");
  let curTab = localStorage.getItem("tab");

  const changeTab = (tab, type) => {
    if (curTab >= tab || tab === 0 || type === "countUp") {
      for (let i = 0; i < titles.length; i++) {
        if (i === tab || !localStorage.getItem("tab")) {
          titles[i].parentElement.classList.add("active");
          localStorage.setItem("tab", i);
        } else {
          titles[i].parentElement.classList.remove("active");
        }
      }
    }
  };

  if (action.type === "countUp") {
    let newTab = +curTab + 1;

    localStorage.setItem("tab", newTab);
    changeTab(newTab, action.type);
  } else if (action.type === "countDown") {
    let newTab = +curTab - 1;

    localStorage.setItem("tab", newTab);
    changeTab(newTab, action.type);
  }else if (action.type === "changeTab") {
    changeTab(action.event.target.tabIndex);
  }

  return state;
};

const store = createStore(Notify);

export default store;
