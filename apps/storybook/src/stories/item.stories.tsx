import { Badge, Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "@design-system/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { Server } from "lucide-react";

const meta = {
  title: "ui/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ItemGroup className="w-96 rounded-lg border">
      <Item variant="default">
        <ItemMedia>
          <Server className="size-5 text-muted-foreground" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Production Cluster US-East</ItemTitle>
          <ItemDescription>Kubernetes node pool • 16 vCPUs</ItemDescription>
        </ItemContent>
        <Badge variant="secondary">Running</Badge>
      </Item>
      <ItemSeparator />
      <Item variant="default">
        <ItemMedia>
          <Server className="size-5 text-muted-foreground" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Staging EU-Central</ItemTitle>
          <ItemDescription>Node pool staging • 8 vCPUs</ItemDescription>
        </ItemContent>
        <Badge variant="outline">Idle</Badge>
      </Item>
    </ItemGroup>
  ),
};
