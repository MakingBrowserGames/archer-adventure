declare module Phecs {
  interface Entity {
    id: string;
    type: string;
    components: Component[];
    hasComponent<T extends ComponentConstructor>(component: T): boolean;
    getComponent<T extends ComponentConstructor>(component: T): InstanceType<T>;
  }

  type EntityData = {
    x: number,
    y: number,
    depth: number,
    [key: string]: any
  };

  interface Component {
    [key: string]: any;
    destroy(): void;
  }

  interface ComponentConstructor {
    new(scene: Phaser.Scene, data: EntityData, entity: Entity): Component;
  }

  type PrefabComponentDefinition = {
    component: ComponentConstructor,
    data?: {
      [key: string]: any,
    }
  }

  type Prefab = {
    components: (PrefabComponentDefinition | ComponentConstructor)[];
  }

  interface System {
    start?(phEntities: any): void;
    stop?(phEntities: any): void;
    update?(phEntities: any): void;
  }

  interface SystemConstructor {
    new(scene: Phaser.Scene): System;
  }
}
