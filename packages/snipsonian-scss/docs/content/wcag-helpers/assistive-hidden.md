# Assistive hidden

Hide content from assistive technologies and visually.

|  |  |
| ---: | --- |
| **use-name:** | `%snip-assistive-hidden`, `.snip-assistive-hidden` |
| **type:** | wcag-helper |

```html
@example
<div>
    <p>Visible everywhere</p>
</div>

<div aria-hidden="true">
    <p>Screen readers scare me</p>
</div>

<div class="snip-assistive-hidden" aria-hidden="true">
    <p>Screen readers and screens scare me</p>
</div>
```
