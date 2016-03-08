# Foundry Table for AngularJS

This is a simple repository for building an editable table from a data set.

## How to use

```
<fndry-table ft-headers='{key:value}' ft-data='[{key:value,...},...]' ft-save-to-element-id='table' />
```

- **ft-headers**  A JSON string object of the headers you want displayed. Keys of the object must match the keys of the data.
            The values of are then what is displayed in the HTML. E.G. {"title":"Title Column","price":"Price Column"}
- **ft-data**     A JSON string array of objects to use for the data. Keys must correspond to the header keys and the values
            would be the value you want displayed to the user.
- **ft-save-to-element-id** An element ID used to save the data to a form input when the save button is clicked.
            
See the demo.html file for a detailed example.