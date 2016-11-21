# `<on>`
Handles a stream inside a marko template

Example:
```html
<ul>
    <on(user in data.usersStream)>
        <li>${user.name}</li>
    </on>
</ul>
```
