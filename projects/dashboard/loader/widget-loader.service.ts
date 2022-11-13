import { Compiler, Injectable, Injector, NgModuleRef, Type } from '@angular/core';

export interface CompileConfig {
  injector?: Injector;
}

@Injectable({
  providedIn: 'root',
})
export class WidgetLoaderService {
  private loadedModules = new Map<Awaited<unknown>, NgModuleRef<unknown>>();

  constructor(private compiler: Compiler, private injector: Injector) {}

  async loadModuleAsync<T>(
    moduleSourceImport: () => Promise<Type<T>>,
    config: CompileConfig = {},
  ): Promise<NgModuleRef<T>> {
    const moduleSource = await moduleSourceImport();

    if (this.loadedModules.has(moduleSource) === false) {
      const factory = await this.compiler.compileModuleAsync(moduleSource);
      const module = factory.create(config.injector ?? this.injector);
      this.loadedModules.set(moduleSource, module);
    }

    return this.loadedModules.get(moduleSource)! as any;
  }
}
