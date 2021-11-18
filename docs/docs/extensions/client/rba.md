# RBA

## RBA Concept
RBA is built-in feature in harmony that give you the option to store in redux store the `permissions` list to the store after login.

## RBA Actions

RBA is a base feature that not import automatic to harmony project.
you can find and use RBA feature if you need under:
`src\base\features\base-rba`

- `RBAStatus` - enum of the all the possible status of each permission
    - `hidden`
    - `disabled`
    - `secured`
- `loadRBAData` - async call to the RBA api and store it in rba slice in store.
basically you call it once user login.
- `cleanRBAData` - clear the rba permissions from cart. basically you call it when user perform logout.
- `getPermissions` - selector to return the permission object from store.

What is the structure of the permissions object after the mapping process?

```json
{ rba: { permissions: { shippment: 'hidden', searchInput: 'disabled', addToCart: 'disabled' } } }
```


## RBAC Component

To use the RBAC component that will wrap your ui component you need to do the following:

```js
import RBAC from '@base/features/base-rba/components/RBAC';
```

In your render you will need to use it as following:

```js
<RBAC id="searchInput">
    <Form.Control
        type="text"
        data-automation-id="filter-input"
        placeholder="Search"
        onChange={(e) => this.setState({ searchValue: e.target.value.toLowerCase() })}
    />
</RBAC>
```
