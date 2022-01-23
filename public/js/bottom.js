
   const title = document.querySelector('#title')
   title.textContent = `Sector ${sectorNumber}`

   const formStackIcon = document.querySelector('#stackIcon');
   formStackIcon.action = `/api/sector${sectorNumber}/stack`

   const formDataForm = document.querySelector('#dataForm');
   formDataForm.action = `/api/sector${sectorNumber}/panel`

            
        let well = document.querySelector('#well0');
        let wellChildrenElements = well.children;
        let controlPanel = document.querySelector('#control-panel');
        let controlPanelSaveStacksBtn = document.querySelector('#control-panel__btn__1');
      
        //<-------------------------- start of Stacks ----------------------->
      
        let stackItemClassName = 'dropped'
        let menu = document.querySelector("#context-menu");
        let menuState = 0;
        let activeClassName = "context-menu--active";
        let menuPosition;
        let menuPositionX;
        let menuPositionY;
        let menuWidth;
        let menuHeight;
        let windowWidth;
        let windowHeight;
        let clickCoords;
        let clickCoordsX;
        let clickCoordsY;
        let rightClickedStack;
      
        //Saves the position of the elements dragged into the sector view
        //Also makes every element in the sector a member of .saveSector
        document.addEventListener('click', (event) => {
          if (event.target !== controlPanelSaveStacksBtn) return;
          //console.log(controlPanelSaveStacksBtn);
          let sectorElementsArray = [...wellChildrenElements];
          if (sectorElementsArray.length === [].length) {
            //console.log("No stacks in the Yard");
          }
          else {
            for (let index = 0; index <= sectorElementsArray.length - 1; index++) {
              let dragposition = {
                left: sectorElementsArray[index].style.left,
                top: sectorElementsArray[index].style.top
              };
              if (sectorElementsArray[index].classList.contains('stack')) {
                sectorElementsArray[index].classList.add("dropped");
                sectorElementsArray[index].classList.add("saveSector");
                sectorElementsArray[index].children[0].value = dragposition.left;
                sectorElementsArray[index].children[1].value = dragposition.top;
                //Saves a newly created stack by left-clicking on stack
                sectorElementsArray[index].submit();
                location.reload();
              } else {
                sectorElementsArray[index].classList.add("saveSector");
                sectorElementsArray[index].style.left = dragposition.left;
                sectorElementsArray[index].style.top = dragposition.top;
              }
            }
          }
        });
      
        //Saves a newly created stack by left-clicking on stack
        document.addEventListener('click', (event) => {
          if (!event.target.classList.contains('dropped')) {
            return;
          } else {
            event.target.submit();
            location.reload();
          }
        });
      
        //get the stacks in the sector from the database
        window.addEventListener('load', (event) => {
          let xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              //.parse() converts the response to a JS object
              let stacks = JSON.parse(xhttp.responseText);
              console.log(stacks)
              stacks.forEach((stack, index) => {
                let well = document.querySelector('#well0');
                let form = document.createElement('form');
                form.setAttribute('id', stack._id);
                form.setAttribute('name', 'stackIcon');
                form.setAttribute('class', 'stack draggable droppable dropped');
                form.setAttribute('action', `/api/sector1/stack/${stack._id}`);
                form.setAttribute('method', 'GET');
                form.setAttribute('onsubmit', 'return false;');
                form.setAttribute('target', 'stackSaved');
                let leftInput = document.createElement('input');
                leftInput.setAttribute('type', 'hidden');
                leftInput.setAttribute('name', 'left');
                leftInput.setAttribute('value', stack.leftPosition);
                let topInput = document.createElement('input');
                topInput.setAttribute('type', 'hidden');
                topInput.setAttribute('name', 'top');
                topInput.setAttribute('value', stack.topPosition);
                let idInput = document.createElement('input');
                idInput.setAttribute('type', 'hidden');
                idInput.setAttribute('name', '_id');
                idInput.setAttribute('value', stack._id);
                form.appendChild(leftInput);
                form.appendChild(topInput);
                form.appendChild(idInput);
                form.style.left = stack.leftPosition;
                form.style.top = stack.topPosition;
      
                //Keeps the hidden input values from being added to the GET req
                //$('form > input:hidden').attr("disabled", true);
      
                //makes the stacks from storage droppable and 
                //brings their panels into position
                $(form).droppable({
                  tolerance: "touch",
                  drop: function (event, ui) {
                    $(event.target).append(ui.draggable);
                    let blueStack = $(this).offset();
                    let panel = ui.draggable.offset();
                    let left_end = blueStack.left - panel.left;
                    let top_end = blueStack.top - panel.top + 2;
                    ui.draggable.animate({
                      top: '+=' + top_end,
                      left: '+=' + left_end
                    }, 0);
                    let droppedPanelId = ui.draggable.data('id');
                    //console.log(this)
                    //console.log('The dropped panel Id is: ' + droppedPanelId);
                    if (event.target.classList.contains('hasPanels')) {
                      return;
                    } else {
                      event.target.classList += ' hasPanels';
                    }
                  }
                })
                well.appendChild(form);
      
                if (stack.panel.length === 0) {
                  //if the stack has no panels
                  return;
                } else {
      
                  stack.panel.forEach((panelInStack, index) => {
                    panelInStack = document.createElement('div')
                    panelInStack.setAttribute('id', stack.panel[index]);
                    panelInStack.setAttribute('class', 'panel');
                    panelInStack.dataset.panelid = stack.panel[index];
                    form.append(panelInStack);
                  })
                }//end of else
              });//end of first forEach
            }//end of if for readyState and status
          };//end of xhr
      
          xhttp.open("GET", `http://52.11.87.227:3000/api/sector${sectorNumber}/stacks`, true);
          xhttp.send();
        });
      
        //deletes a stack from the sector
        document.addEventListener('click', (event) => {
          if (!event.target.classList.contains('delete')) {
            return;
          } else {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                let deletedStack = JSON.parse(xhttp.responseText);
                //console.log(deletedStack);
                location.reload();
              }
            }
            xhttp.open("DELETE", `http://52.11.87.227:3000/api/sector${sectorNumber}/stack/${rightClickedStack.id}`, true);
            xhttp.send();
          }
        });
      
        //displays panels in a viewer for the selected stack (view mode)
        document.addEventListener('click', (event) => {
          if (!event.target.classList.contains('view')) {
            return;
          } else {
            //clears any previous panels from the viewer
            let stackUi = document.getElementById('stack__Ui')
            while (stackUi.firstChild) {
              stackUi.removeChild(stackUi.firstChild)
            }
            let retrievedStack;
            let xhttp = new XMLHttpRequest();
            xhttp.open("GET", `http://52.11.87.227:3000/api/sector${sectorNumber}/stack/${rightClickedStack.id}`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
            xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                retrievedStack = JSON.parse(xhttp.responseText);
                retrievedStack = retrievedStack.reverse();
                retrievedStack.filter((panel) => { return panel !== null }).forEach((panel, index) => {
                  console.log(panel);
                  let panelNameText = document.createTextNode(`${panel.size}${panel.tieStrips} ${panel.linerType}`);
                  let panelInSlot = document.createElement('h2');
                  panelInSlot.appendChild(panelNameText);
                  panelInSlot.setAttribute('id', panel._id);
                  console.log(panelInSlot.id);
                  panelInSlot.setAttribute('class', 'retrievedPanel__slot viewMode');
                  stackUi.appendChild(panelInSlot);
                })
              }
            }
          }//end of else
        });
      
      
        //displays panels in a viewer for the selected stack (edit mode)
        document.addEventListener('click', (event) => {
          if (!event.target.classList.contains('edit')) {
            return;
          } else {
            //clears any previous panels from the viewer
            let stackUi = document.getElementById('stack__Ui')
            while (stackUi.firstChild) {
              stackUi.removeChild(stackUi.firstChild)
            }
            let retrievedStack;
            let xhttp = new XMLHttpRequest();
            xhttp.open("GET", `http://52.11.87.227:3000/api/sector${sectorNumber}/stack/${rightClickedStack.id}`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
            xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                retrievedStack = JSON.parse(xhttp.responseText);
                retrievedStack = retrievedStack.reverse();
                retrievedStack.filter((panel) => { return panel !== null }).forEach((panel, index) => {
                  //console.log(panel);
                  let panelNameText = document.createTextNode(`${panel.size}${panel.tieStrips} ${panel.linerType}`);
                  let panelInSlot = document.createElement('h2');
                  panelInSlot.appendChild(panelNameText);
                  panelInSlot.setAttribute('id', panel._id);
                  //console.log(panelInSlot.id);
                  panelInSlot.setAttribute('class', 'retrievedPanel__slot editMode');
                  stackUi.appendChild(panelInSlot);
                })
              }
            }
          }//end of else
        });
      
        //delete the selected panel from the stack in the edit mode viewer
        document.addEventListener('click', (event) => {
          if (!event.target.classList.contains('editMode')) {
            return;
          } else {
            //remove the panel node from the DOM
            event.target.parentNode.removeChild(event.target);
      
            //perform a DELETE call of the panel in the panel collection
            let xhttp1 = new XMLHttpRequest();
            xhttp1.open('DELETE', `http://52.11.87.227:3000/api/sector${sectorNumber}/panel/${event.target.id}`, true);
            xhttp1.send();
      
            //Remove the panel selected in the viewer for deletion from rightClickedStack
            console.log('the panel clicked ' + event.target.id)
            let panelCollection = rightClickedStack.childNodes;
            for (let i = 0; i <= panelCollection.length - 1; i++) {
              if (panelCollection[i].id === event.target.id) {
                rightClickedStack.removeChild(rightClickedStack.childNodes[i]);
              }
            }
      
            //Collect the ids of the remaining childNodes of rightClickedStack 
            //that are divs (aka the panels)
            let panelArray = [];
            let panelIdArray = [];
            panelArray = [...rightClickedStack.children];
            panelArray = panelArray.filter((element) => {
              if (element.classList.contains('panel')) {
                return element;
              }
            });
            panelArray.forEach((panel) => {
              panelIdArray.push(panel.id);
            })
      
            //passes the ids of the panels through the req.body
            var data = {};
            data.panel = panelIdArray;
            var json = JSON.stringify(data);
      
            var xhttp2 = new XMLHttpRequest();
            xhttp2.open("PUT", `http://52.11.87.227:3000/api/sector${sectorNumber}/stack/${rightClickedStack.id}`, true);
            xhttp2.setRequestHeader("Content-type", "application/json");
            xhttp2.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                //console.log(xhttp.responseText);
                let stack = JSON.parse(xhttp2.responseText);
                //console.log(stack);
              }
            };
            xhttp2.send(json);
          }
          location.reload();
        });
      
        // <-------------------start of Context Menu ------------------------>
      
        //the controller for stack context menu
        document.addEventListener('contextmenu', (e) => {
          rightClickedStack = clickInsideElement(e, stackItemClassName)
          if (rightClickedStack) {
            e.preventDefault();
            toggleMenuOn(e);
            positionMenu(e);
          } else {
            toggleMenuOff(e);
          }
        });
      
        function clickInsideElement(e, className) {
          let el = e.target;
      
          if (el.classList.contains(className)) {
            return el;
          } else {
            while (el = el.parentNode) {
              if (el.classList && el.classList.contains(className)) {
                return el
              }
            }
          }
          return false;
        }
      
        function toggleMenuOn(e) {
          if (menuState !== 1) {
            menuState = 1;
            menu.classList.add(activeClassName);
          }
        }
      
        function toggleMenuOff() {
          if (menuState !== 0) {
            menuState = 0;
            menu.classList.remove(activeClassName);
          }
        }
      
        //closes the stack context menu with a left click
        document.addEventListener('click', (event) => {
          let button = event.button;
          if (button === 0) {
            toggleMenuOff();
          }
        })
      
        //escapes the stack context menu (Esc button)
        window.addEventListener('keyup', (event) => {
          if (event.keyCode === 27) {
            toggleMenuOff();
          }
        });
      
        //gets the position of the right click on the document
        function getPosition(e) {
          let posx = 0;
          let posy = 0;
      
          if (!e) {
            let e = window.event;
          }
      
          if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
          } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
          }
      
          return {
            x: posx,
            y: posy
          }
        }
      
        //positions the stack context menu
        function positionMenu(e) {
          clickCoords = getPosition(e);
          clickCoordsX = clickCoords.x;
          clickCoordsY = clickCoords.y;
      
          menuWidth = menu.offsetWidth + 4;
          menuHeight = menu.offsetHeight + 4;
      
          windowWidth = window.innerWidth;
          windowHeight = window.innerHeight;
      
          if ((windowWidth - clickCoordsX) < menuWidth) {
            menu.style.left = windowWidth - menuWidth + "px";
          } else {
            menu.style.left = clickCoordsX + "px";
          }
      
          if ((windowHeight - clickCoordsY) < menuHeight) {
            menu.style.top = windowHeight - menuHeight + "px";
          } else {
            menu.style.top = clickCoordsY - 120 + "px";
          }
        }
      
        window.addEventListener('onresize', () => {
          toggleMenuOff();
        });
      
        //<---------------------- end of Context Menu ----------------------->
        //<----------------------end of Stacks ------------------------------>
      
        //<----------------------start of Panels ---------------------------->
      
        //resets the dataForm when it has been submitted
        //so you can enter another panel's data
        let dataForm = document.getElementById('dataForm');
        dataForm.addEventListener('submit', () => {
          setTimeout(() => {
            dataForm.reset();
          }, 100)
        })
      
      
        //pulls the panel data (id from the res) from the panelIframe and 
        //gives the panel clone its id created by the database. Only applies
        //to the FIRST CLICK since we immediately change it's id
        document.addEventListener('mousedown', (event) => {
          if (event.target.id !== 'panelIconClone') {
            return;
          } else {
            let data = document.getElementById('panelIframe').contentDocument.documentElement.textContent;
            data = JSON.parse(data);
            event.target.id = data._id;
      
            //add a class here panelIdentified to event.target
            event.target.classList += ' panelIdentified';
      
            //add a class here created to event.target so panels can be moved
            //by touch on mobile devices
            event.target.classList += ' createdPanel';
      
            //change the position property of the element
            event.target.position = "absolute";
            event.target.top = '2px';
            event.target.left = '0px';
      
            //makes .panelIdentified draggable and sends the id of the panel
            //to the stack it is dropped on
            $('.panelIdentified').draggable({
              start: function (event) {
                let id = event.target.id;
                $(event.target).data('id', id);
              }
            })
            //console.log(event.target);
          }
        })
      
        //saving the stack and updating its state
        document.addEventListener('click', (event) => {
          if (!event.target.classList.contains('hasPanels')) {
            return;
          } else {
            let panelArray = [];
            let panelIdArray = [];
            panelArray = [...event.target.children];
            panelArray = panelArray.filter((element) => {
              if (element.classList.contains('panel')) {
                return element;
              }
            });
            panelArray.forEach((panel) => {
              panelIdArray.push(panel.id);
            })
      
            //passes the ids of the panels through the req.body
            var data = {};
            data.panel = panelIdArray;
            var json = JSON.stringify(data);
      
            var xhttp = new XMLHttpRequest();
            xhttp.open("PUT", `http://52.11.87.227:3000/api/sector${sectorNumber}/stack/${event.target.id}`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                //console.log(xhttp.responseText);
                let stack = JSON.parse(xhttp.responseText);
                //console.log(stack);
              }
            };
            xhttp.send(json);
          }
        });
      
        //Query the sector for a panel
        document.querySelector('#control-panel__btn__2').addEventListener('click', () => {
          let sizePrompt = prompt("Enter the panel size: ");
          let tieStripsPrompt = prompt("Enter the number of tie strips: ");
          let linerTypePrompt = prompt("Enter the liner type");
      
          //Solution Attempt #1
          //let sectorPanels = [];
          //let sectorPanelsIds = [];
          //let xhttp1 = new XMLHttpRequest();
          //xhttp1.open('GET', `http://52.11.87.227:3000/api/sector1/stacks`, true);
          //xhttp1.send();
          //xhttp1.onreadystatechange = function () {
          //if (this.readyState == 4 && this.status == 200) {
          //let stacks = JSON.parse(xhttp1.responseText);
          //for (i = 0; i <= stacks.length - 1; i++) {
          //if (stacks[i].panel.length !== 0) {
          //sectorPanels.push(...stacks[i].panel);
          //sectorPanelsIds = [].concat(...sectorPanels);
          //}
          //}
      
      
          //}
          //}
      
          //console.log(sectorPanels)
          //console.log(sectorPanelsIds)
      
          let xhttp = new XMLHttpRequest();
          xhttp.open('GET', `http://52.11.87.227:3000/api/sector${sectorNumber}/panels`, true);
          xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              let currentPanels = JSON.parse(xhttp.responseText);

              userDataStr = sizePrompt.toUpperCase() + tieStripsPrompt + ' ' + linerTypePrompt.toUpperCase();
              for (let i = 0; i <= currentPanels.length - 1; i++) {
                let panelDataStr = currentPanels[i].size.toUpperCase() + currentPanels[i].tieStrips + ' ' + currentPanels[i].linerType.toUpperCase();
          
                if (userDataStr === panelDataStr) {
                  const panels = document.querySelectorAll(".panel")
                  panels.forEach(panel => {
                    if (panel.dataset.panelid) {
                      if(panel.dataset.panelid === currentPanels[i]._id) {
                        panel.parentElement.classList.add('hasQueriedPanel');
                      }
                    }
                  })
                  
                }
              }
            }
          }
          xhttp.send();
        });
      
        //Touch experimentation
        document.addEventListener('touchstart', (event) => {
          if (!event.target.classList.contains('created')) {
            return;
          } else {
            console.log('here');
            return;
          }
        });
      
        document.addEventListener('touchmove', (event) => {
          if (!event.target.classList.contains('created')) {
            return;
          } else {
      
            //console.log('here');
            return;
          }
        });
      
        document.addEventListener('touchend', (event) => {
          if (!event.target.classList.contains('created')) {
            return;
          } else {
            console.log(event.target);
            let id0 = event.target;
            id0.children[0].value = event.changedTouches[event.changedTouches.length - 1].pageX;
            id0.children[1].value = event.changedTouches[event.changedTouches.length - 1].pageY;
            id0.style.left = (id0.children[0].value - 530) + 'px';
            id0.style.top = (id0.children[1].value - 250) + 'px';
            console.log(id0.style.left);
            console.log(id0.style.top);
      
            return;
          }
        });
      
        document.addEventListener('touchend', (event) => {
          if (!event.target.classList.contains('createdPanel')) {
            return;
          } else {
            console.log(event.target);
            let panelIconClone = event.target;
      
            panelIconClone.style.left = (event.changedTouches[event.changedTouches.length - 1].pageX - 530) + 'px';
            panelIconClone.style.top = (event.changedTouches[event.changedTouches.length - 1].pageY - 250) + 'px';
            console.log(panelIconClone.style.left);
            console.log(panelIconClone.style.top);
            return;
          }
        });

const sectorLinks = document.querySelectorAll("[id^='link__']");
            
sectorLinks.forEach((link, index) => {

    const sectorNumber = link.children[0].textContent;

    if (index === 0) {
        link.addEventListener('click', () => {
            window.location.href = `http://52.11.87.227:3000/`;
        });
    } else {
        link.addEventListener('click', () => {
            window.location.href = `http://52.11.87.227:3000/sector.html?sectornumber=${sectorNumber}`;
        });
    }

    
});