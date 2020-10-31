import createDataContext from "./createDataContext";
import { combineReducers } from "redux";
import { db } from "../config";
import * as firebase from "firebase";

const categories = (state = null, action) => {
  switch (action.type) {
    case "getCategory":
      return action.payload;
    default:
      return state;
  }
};

const currentlystarted = (state = null, action) => {
  switch (action.type) {
    case "getCurrentlyStarted":
      return action.payload;
    default:
      return state;
  }
};

const trackerReducer = combineReducers({
  currentlystarted,
  categories,
});

const getCategory = (dispatch) => {
  return () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        dispatch({ type: "getCategory", payload: [] });
      }
    });

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    db.ref(uid)
      .child("/categories")
      .on("value", (snapshot) => {
        if (snapshot.val() === null) {
          data = [];
        } else {
          data = Object.values(snapshot.val());
        }

        dispatch({ type: "getCategory", payload: data });
      });
  };
};

const addCategory = () => {
  return (title, category, callback) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        return;
      }
    });

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    const catid = Math.floor(Math.random() * 99999);
    db.ref(uid).child("/categories").child(catid).set({
      catid,
      title,
      category,
    });
    if (callback) {
      callback();
    }
  };
};

const deleteCategory = () => {
  return (catid, callback) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        return;
      }
    });

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    db.ref(uid).child("/categories").child(catid).remove();
    if (callback) {
      callback();
    }
  };
};

const editCategory = () => {
  return (catid, title, category, callback) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        return;
      }
    });

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    db.ref(uid)
      .child("/categories")
      .child(catid)
      .update({ catid, title, category });
    if (callback) {
      callback();
    }
  };
};

const addItem = () => {
  return (catid, title, callback) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        return;
      }
    });

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    const itemid = Math.floor(Math.random() * 99999);
    db.ref(uid).child("/categories").child(`${catid}/items/${itemid}`).set({
      itemid,
      title: title,
      started: false,
    });
    if (callback) {
      callback();
    }
  };
};

const deleteItem = () => {
  return (catid, itemid, callback) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        return;
      }
    });

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    db.ref(uid).child("/categories").child(`${catid}/items/${itemid}`).remove();
    if (callback) {
      callback();
    }
  };
};

const editItem = () => {
  return (catid, itemid, title, started, callback) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        return;
      }
    });

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    db.ref(uid)
      .child("/categories")
      .child(`${catid}/items/${itemid}`)
      .update({ itemid, title, started });
    if (callback) {
      callback();
    }
  };
};

const getCurrentlyStarted = (dispatch) => {
  return () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        return;
      }
    });

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    db.ref(uid)
      .child("/currentlystarted")
      .on("value", (snapshot) => {
        if (snapshot.val() === null) {
          data = [];
        } else {
          data = Object.values(snapshot.val());
        }
        dispatch({ type: "getCurrentlyStarted", payload: data });
      });
  };
};

const setStarted = () => {
  return (catid, itemid, title, started) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        return;
      }
    });

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    db.ref(uid)
      .child(`/categories`)
      .child(`${catid}/items/${itemid}`)
      .update({ itemid, title, started });
  };
};

const startItem = () => {
  return (catid, itemid, title) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        return;
      }
    });

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    db.ref(uid)
      .child(`/currentlystarted/${itemid}`)
      .set({ catid, itemid, title });
  };
};

const stopItem = () => {
  return (itemid) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        return;
      }
    });

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    db.ref(uid).child(`/currentlystarted/${itemid}`).remove();
  };
};

export const { Context, Provider } = createDataContext(
  trackerReducer,
  {
    addCategory,
    getCategory,
    deleteCategory,
    editCategory,
    getCurrentlyStarted,
    addItem,
    deleteItem,
    editItem,
    setStarted,
    startItem,
    stopItem,
  },
  {
    categories: [],
    currentlystarted: [],
  }
);
