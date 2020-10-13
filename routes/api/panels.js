const express = require('express');
const PanelModel = require('../../models/Panel')
const router = express.Router();

// @route GET api/panels
// @desc Test panels retrieval
// @access Public
  router.get('/api/panels', async (req, res) => {
    const panels = await PanelModel.find({});
    //res.send('Panels route');
    
      try {
        res.send(panels);
      } catch (err) {
        res.status(500).send(err);
      }
    });
    
    router.post('/api/panel', async (req, res) => {
      if (req.body !== null) {
        if (req.body.dowels === 'on') {
          req.body.dowels = true;
        }
        if (req.body.r6 === 'on') {
          req.body.r6 = true;
        }
        if (req.body.bigTies === 'on') {
          req.body.bigTies = true;
        }
      }

      const panel = new PanelModel(req.body);

      try {
        await panel.save();
        res.send(panel);
      } catch (err){
        res.status(500).send(err);
        console.log(err)
      }
    });
    
    router.delete('/api/panel/:id', async (req, res) => {
      try {
        const panel = await PanelModel.findByIdAndDelete(req.params.id);
    
        if (!panel) res.status(404).send("No item found");
        res.status(200).send()
    
        } catch (err) {
          res.status(500).send(err)
        }
    });
    
    router.patch('/api/panel/:id', async (req, res) => {
      try {
        await PanelModel.findByIdAndUpdate(req.params.id, req.body);
        await PanelModel.save();
        res.send(panel);
      } catch (err) {
        res.status(500).send(err);
      }
    })
    
module.exports = router;


//Code for a panel form to test panel submission to the database. Currently we are using Postman for the same functionality

// const express = require('express');
// const router = express.Router();

// // @route GET api/panels
// // @desc Test panel communication with database
// // @access Public
// router.get('/', (req, res) => {
//   res.send('<form id="dataForm"  class="submission-form" style="visibility: visible; max-width: 170px; margin: 2rem auto; border: 2px solid rgb(205, 214, 162); padding: 2rem;"><label for="size">Size:</label><input type="text" name="size" autocomplete="off"><label for="tieStrips">Tie Strips:</label><input type="text" name="tieStrips" autocomplete="off"><label for="linerType">Liner Type:</label><input type="text" name="linerType" autocomplete="off"><label for="dowels">Dowels:</label><input type="text" name="dowels" autocomplete="off"><label for="r6">R6:</label><input type="text" name="r6" autocomplete="off"><label for="bigTies">Big Ties:</label><input type="text" name="bigTies" autocomplete="off"><label for="wall">Wall:</label><input type="text" name="wall" autocomplete="off"><input type="submit" value="Send"></form>');
// });



// module.exports = router;