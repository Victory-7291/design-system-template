import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@design-system/ui";

const meta: Meta<typeof Text> = {
  title: "Primitives/Text",
  component: Text,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Display: Story = {
  args: {
    variant: "display",
    children: "Transforming Software Architecture",
  },
};

export const Eyebrow: Story = {
  args: {
    variant: "eyebrow",
    children: "Architecture Overview",
  },
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="h1">Heading 1 - Page Title</Text>
      <Text variant="h2">Heading 2 - Section Header</Text>
      <Text variant="h3">Heading 3 - Subsection Title</Text>
      <Text variant="body">
        Body text has strict reading ergonomics. It limits line length to a maximum of 65 characters to preserve vertical scanning rhythm and cognitive comfort.
      </Text>
      <Text variant="caption">Caption text for timestamps, photo credits, and secondary metadata.</Text>
    </div>
  ),
};
