var model = {
    currentCat: null,
    //shows admin display
    adminOpen: false,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },

    //function runs when 'Admin' button is clicked.
    adminDisplay: function(){
        if (model.adminOpen === false) {
            model.adminOpen = true;
            adminView.show(); //displays the admin input boxes and buttons
        }
        else if (model.adminOpen === true) {
            model.adminOpen = false;
            adminView.hide();// hides the admin input boxes and buttons
        }
    },

    //hides admin display when cancel button is clicked.
    adminCancel: function(){
        adminView.hide();
    },

    //hides admin display and saves new cat data when save button is clicked.
    adminSave: function(){
        model.currentCat.name= adminCatName.value;
        model.currentCat.imgSrc= adminCatURL.value;
        model.currentCat.clickCount= adminCatClicks.value;
        catView.render();
        catListView.render();
        adminView.hide();
    }
};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');


        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catListElem = document.getElementById('cat-list');
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

var adminView = {
  init: function() {
    //store pointers to our admin DOM elements for access later.
    this.adminForm = document.getElementById('admin-form');
    this.nameForm = document.getElementById('name-form');
    this.imageForm = document.getElementById('image-url');
    this.countForm = document.getElementById('count-form');
    this.cancelBtn = document.getElementById('cancel-btn');
    this.saveBtn = document.getElementById('save-btn');
    this.countElem = document.getElementById('cat-count');
    var admin = document.getElementById("admin");

    this.adminBtn = document.getElementById("admin-btn");
    this.saveBtn = document.getElementById("save-btn");

    this.adminBtn.addEventListener('click', function(){ //shows the admin display.
        octopus.adminDisplay();
    });

    this.cancelBtn.addEventListener('click', function(){ //hides the admin display without saving any new cat data.
        octopus.adminCancel();
    });

    this.saveBtn.addEventListener('click', function(){ //hides the admin display and saves new cat data.
        octopus.adminSave();
    });


    //render because this seems to be the thing to do here. Touch.
    this.render();

  },

  render: function() {

    //adminView.render();
  },

  show: function(){
           admin.style.display = 'block'; //shows the admin div on index.html
       },

   hide: function(){
       admin.style.display = 'none';
   }
};

// make it go!
octopus.init();
