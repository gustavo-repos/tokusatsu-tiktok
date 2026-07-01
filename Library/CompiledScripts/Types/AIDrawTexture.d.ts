declare namespace APJS {
  /**
   * @class AIDrawTextureProvider
   * @description Provider for AI-generated texture assets. Use it as the control object returned by `texture.getControl()` on an AI Draw texture resource.
   * Configure generation inputs such as `prompt`, style-related properties, and dynamic properties, then toggle `play` to submit or stop generation.
   *
   * @example
   * ```typescript
   * const provider = texture.getControl() as APJS.AIDrawTextureProvider;
   * provider.prompt = 'oil painting cat';
   * provider.play = true;
   * ```
   */
  class AIDrawTextureProvider extends RenderTextureProvider implements IDynamicAsset{
    protected constructor();
  
    /**
     * @description get prompt.
     */
    get prompt(): string;
    /**
     * @description set prompt.
     * @param {string} value - New prompt string to set to
     */
    set prompt(value: string);
    /**
     * @description play.
     */
    get play(): boolean;
    /**
     * @description play.
     */
    set play(value: boolean);
  }
}