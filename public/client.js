// ------------------------------ //
// Data storage

// This returns the object that `store` references, after having frozen `store`.
// This should, if I'm understanding correctly, result in a frozen object in the wild.
const createDataStore = data => {
  const store = Object.assign({}, data);
  Object.freeze(store);
  
  return store;
};

// ------------------------------ //
// API Calls

const fetchInventory = () => {
  return fetch('/inventory')
    .then(res => res)
    .catch(err => console.error(err));
};


// ------------------------------ //
// Templating

class Template {
  // templateId : string -- should be a valid id
  constructor(templateId) {
    this.id = '#' + templateId;
    this.body = document.querySelector(this.id).innerHTML;
    this._setClass(templateId);
  }
  
  _setClass(value) {
    const arr = value.split('-');
    if (arr[arr.length - 1] === 'template') {
      arr.pop();
    }
    
    this.class = arr.join('-');
  }
  
  _compileResult(data) {
    const compiledTemplate = Handlebars.compile(this.body);
    return compiledTemplate(data);
  }
  
  // parentSelector : string
  // data : object
  render(parentSelector, data) {
    const result = this._compileResult(data);

    const parser = new DOMParser();
    const component = parser.parseFromString(result, 'text/html').getElementsByClassName(this.class)[0];
    const mountPoint = document.querySelector(parentSelector);
    
    mountPoint.appendChild(component);
  }
}

// ------------------------------ //
// rendering stuff 

const renderHelloWorld = () => {
  const hello = new Template('helloWorldTemplate');
  hello.render('.hello-world-test', { name: 'Chris' });
};

const renderInventory = inventory => {
  const inventoryItem = new Template('inventory-item-template');
  
  for (let item of inventory) {
    inventoryItem.render('.inventory-panel', item);
  }
};

// renders : Array -- an array of functions. Each function should call one or more Template's `render` function
const runRenders = (renders, data) => {
  for (let render of renders) {
    render(data.inventory);
  }
};

const loadTemplates = () => {
  // TODO: sub in fetch call
  const data = {
    inventory: [
      {
        name: 'Sears 3/4-inch Screws',
        size: '3/4 inch',
        price: .69,
        stock: 386
      },
      {
        name: 'Ready Maed Hammer Heads',
        size: '7 inch x 4 inch x 4',
        price: 24.99,
        stock: 12
      },
      {
        name: 'Energizer Screwdriver',
        size: '9 inch x 1.7 inch',
        price: 12.95,
        stock: 26
      }
    ]
  };

  const renders = [renderInventory];
  runRenders(renders, data);
}

window.onload = loadTemplates;
