### Responsive Props

When not supplied an `xs`, `sm`, `md`, `lg` or `xl` prop, Col components automatically expand to fill the width of their container. You can specify a column amount from 1 to 12 when they are specified.

The `xs`, `sm`, `md`, `lg` or `xl` props correspond to their min-width breakpoints. For example, when `md` is defined as `6`, your column width will be `6` from the `md` breakpoint and greater, unless you specify a value for `lg` or `xl`. Refer to the chart in the [**Responsive**](#responsive) section to learn what each breakpoint equates to.

The `span` and `offset` props is now deprecated. Please use the `xs` and `xsOffset` props for identical functionality.

```jsx
<FlexGrid>
  <FlexGrid.Row>
    <FlexGrid.Col xs={12} sm={3}>
      <div className="docs_coloured-box">
        <Text>3 column</Text>
      </div>
    </FlexGrid.Col>
    <FlexGrid.Col xs={12} sm={4} md={5} lg={6} xl={7}>
      <div className="docs_coloured-box">
        <Text>3-7 columns, depending on window size</Text>
      </div>
    </FlexGrid.Col>
    <FlexGrid.Col xs={12} md={2}>
      <div className="docs_coloured-box">
        <Text>2 columns</Text>
      </div>
    </FlexGrid.Col>
  </FlexGrid.Row>
</FlexGrid>
```

### Offset

Supplying an `xsOffset`, `smOffset`, `mdOffset`, `lgOffset` or `xlOffset` prop will add a left margin to your Col depending on screen size.

```jsx
<FlexGrid>
  <FlexGrid.Row>
    <FlexGrid.Col xsOffset={3}>
      <div className="docs_coloured-box">
        <Text>3 columns away</Text>
      </div>
    </FlexGrid.Col>
    <FlexGrid.Col xsOffset={1} lgOffset={4}>
      <div className="docs_coloured-box">
        <Text>1 or 4 columns away</Text>
      </div>
    </FlexGrid.Col>
  </FlexGrid.Row>
</FlexGrid>
```
