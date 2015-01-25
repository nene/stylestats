# Stylestats

My home-grown CSS statistics generator.

## Development ideas

- Sort colors based on similarity

- Group selectors by pattern:
  - .class:hover
  - #id .class .class
  - type.class

- Better stats data structure:

    {
        type: "group",
        title: "Colors",
        count: 25, // optional
        children: [ ... ]
    }

    {
        type: "style",
        example: { ... }, // Optional "example" object
        variants: [ ... ],
    }

    {
        type: "example",
        name: "color",
        css: {backgroundColor: "red"}
    }

    {
        type: "variant",
        value: "#ff0000",
        count: 8,
        decls: [ ... ]
    }

For example for selectors:

    {
        type: "group",
        title: "Selectors",
        count: 28,
        children: [
            {
                type: "style",
                variants: [
                    {
                        type: "variant",
                        value: ".class",
                        count: 23,
                        decls: [ ... ]
                    }
                ]
            },
            {
                type: "style",
                variants: [
                    {
                        type: "variant",
                        value: ":before",
                        count: 2,
                        decls: [ ... ]
                    }
                ]
            }
        ]
    }


