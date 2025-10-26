# Sample Adaptive Card for Testing

This file contains sample Adaptive Card payloads that you can use to test the integration.

## Welcome Card
```json
{
  "type": "AdaptiveCard",
  "version": "1.4",
  "body": [
    {
      "type": "TextBlock",
      "text": "Welcome to Copilot Chatbot!",
      "weight": "bolder",
      "size": "medium",
      "color": "accent"
    },
    {
      "type": "TextBlock",
      "text": "This is a sample Adaptive Card. You can interact with the buttons below.",
      "wrap": true,
      "spacing": "medium"
    },
    {
      "type": "Input.Text",
      "id": "userName",
      "placeholder": "Enter your name",
      "label": "Name"
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Submit",
      "data": {
        "action": "submitName"
      }
    },
    {
      "type": "Action.OpenUrl",
      "title": "Learn More",
      "url": "https://docs.microsoft.com/en-us/adaptive-cards/"
    }
  ]
}
```

## Product Card
```json
{
  "type": "AdaptiveCard",
  "version": "1.4",
  "body": [
    {
      "type": "ColumnSet",
      "columns": [
        {
          "type": "Column",
          "width": "auto",
          "items": [
            {
              "type": "Image",
              "url": "https://via.placeholder.com/100x100",
              "size": "medium"
            }
          ]
        },
        {
          "type": "Column",
          "width": "stretch",
          "items": [
            {
              "type": "TextBlock",
              "text": "Sample Product",
              "weight": "bolder",
              "size": "medium"
            },
            {
              "type": "TextBlock",
              "text": "This is a sample product card with an image and description.",
              "wrap": true,
              "spacing": "small"
            },
            {
              "type": "TextBlock",
              "text": "$99.99",
              "weight": "bolder",
              "color": "accent",
              "size": "medium"
            }
          ]
        }
      ]
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Add to Cart",
      "data": {
        "action": "addToCart",
        "productId": "123"
      }
    },
    {
      "type": "Action.OpenUrl",
      "title": "View Details",
      "url": "https://example.com/product/123"
    }
  ]
}
```

## Form Card
```json
{
  "type": "AdaptiveCard",
  "version": "1.4",
  "body": [
    {
      "type": "TextBlock",
      "text": "Contact Form",
      "weight": "bolder",
      "size": "large",
      "color": "accent"
    },
    {
      "type": "Input.Text",
      "id": "firstName",
      "placeholder": "First Name",
      "label": "First Name"
    },
    {
      "type": "Input.Text",
      "id": "lastName",
      "placeholder": "Last Name",
      "label": "Last Name"
    },
    {
      "type": "Input.Email",
      "id": "email",
      "placeholder": "Email Address",
      "label": "Email"
    },
    {
      "type": "Input.Number",
      "id": "age",
      "placeholder": "Age",
      "label": "Age",
      "min": 0,
      "max": 120
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Submit Form",
      "data": {
        "action": "submitForm"
      }
    }
  ]
}
```
