const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());   
const sectorNumber = params.sectornumber 

$(function () {
    $('.tool').draggable();
  });

  $(function () {
    $('well').draggable();
  })

  $(function () {
    let cloneId = 0;

    $("#stackIcon").click(function () {
      $("#stackIcon")
        .clone()
        .appendTo("#well0")
        .draggable({
          cancel: false,
          containment: "document"
        })
        .attr('class', 'stack created')
        .attr('id', 'id' + cloneId++)
        .droppable();
    })
  });


  //submit panels to the panels collection, assigns panelIconClone as 
  //the id to clones when they are put in well
  $(function () {
    $("#panelIcon").click(function () {
      $("#panelIcon")
        .clone()
        .appendTo("#well0")
        .draggable({ cancel: false })
        .attr('id', 'panelIconClone')
        .droppable()
        .css("visibility", "hidden");

      //code that makes the panel clone visible in the well
      //and hides the dataForm so you can't add another panel clone 
      //without selecting the panel icon
      let dataForm = document.getElementById('dataForm');
      let well = document.querySelector('#well0');
      dataForm.addEventListener('submit', () => {
        well.lastElementChild.style.visibility = "visible";
        dataForm.style.visibility = "hidden";
      })
    })
  });

  $(function () {
    $("#cornerIcon").click(function () {
      $("#cornerIcon").clone().appendTo("#well0").draggable({ cancel: false });
    })
  });

  $(function () {
    let flag = false;
    $('#panelIcon').click(function () {
      if (flag === false) {
        $("#dataForm").css("visibility", "visible");
      } else {
        $("#dataForm").css("visibility", "hidden");
        flag = false;
      }
    })
  })
