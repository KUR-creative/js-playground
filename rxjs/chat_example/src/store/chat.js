import { Subject } from 'rxjs';

const subject = new Subject();
// An RxJS Subject can act as both an
// Observable and an Observer at the same time.

const initialState = {
  status: '',
  data: [],
  newDataCount: 0,
  error: ''
}; 
let state = initialState;

const chatStore = {
  init: () => {
    state = {...state, newDataCount: 0};
    subject.next(state);
  },
  // initialize our component’s state whenever it’s mounted
  // The Subject.next() method is used to feed a new value to the Subject.
  // When we call the next() method with a value as its parameter,
  // that value is multicasted to all Observers subscribed to the Subject.
  subscribe: setState => subject.subscribe(setState),
  sendMessage: message => {
    //console.log(window, window.requestFileSystem, window.webkitRequestFileSystem);
    //console.log(window.PERSISTENT);
    // We’ll call this method whenever our users hit the send message button.
    state = {
      ...state, // merge with old state
      data: [...state.data, message],
      newDataCount: state.newDataCount + 1
    };
    subject.next(state);
  },
  clearChat: () => {
    state = initialState;
    subject.next(state);
  },
  initialState // use this to set our initial state value
  // when defining our chatState with the useState() Hook.
}
// we’ll be subscribing our different React Hooks *setState* functions
// to our RxJS Subject so that when it receives any data,
// it forwards that data to every state associated with our setState function.

export default chatStore;
