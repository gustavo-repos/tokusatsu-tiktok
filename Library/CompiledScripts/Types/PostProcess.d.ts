declare namespace APJS {
  /**
   * @class Bloom
   * @description Represents a PostEffect specifically designed for the Bloom.
   * This class implements bloom post-processing effects with various configurable parameters.
   */
  class Bloom extends PostEffect {
    protected constructor();
  
    /**
     * @description Gets or sets the bloom anamorphic ratio. Stretches the glow horizontally or vertically.
     * Range: [-1, 1].
     */
    get anamorphicRatio(): number;
  
    set anamorphicRatio(value: number);
  
    /**
     * @description Gets or sets the bloom clamp value. Limits the maximum brightness of the glow.
     * Range: [0, 65535].
     */
    get clamp(): number;
  
    set clamp(value: number);
  
    /**
     * @description Gets or sets the bloom effect color, used to tint the glow.
     */
    get color(): Color;
  
    set color(value: Color);
  
    /**
     * @description Gets or sets the bloom diffuse factor. Controls the blur radius of the glow. Range: [0, 10].
     */
    get diffuse(): number;
  
    set diffuse(value: number);
  
    /**
     * @description Gets whether fast mode is enabled. Improves performance at the cost of quality.
     * @deprecated Fast mode is editor-only and cannot be enabled at runtime. Reading this property is safe, but new code should prefer tuning `threshold`, `softKnee`, `clamp`, `anamorphicRatio`, and `diffuse` instead of relying on fast mode.
     */
    get fastMode(): boolean;
  
    /**
     * @description Sets whether fast mode is enabled. Improves performance at the cost of quality.
     * @deprecated Fast mode is editor-only and cannot be enabled at runtime. Existing editor configurations may still read this flag, but new code should prefer tuning `threshold`, `softKnee`, `clamp`, `anamorphicRatio`, and `diffuse` instead of setting fast mode.
     */
    set fastMode(value: boolean);
  
    /**
     * @description Gets or sets the bloom effect intensity. Higher values make the glow stronger.
     * 1–25 range typical.
     */
    get intensity(): number;
  
    set intensity(value: number);
  
    /**
     * @description Gets or sets the bloom soft knee value. Smooths the transition around the threshold.
     * Range: [0, 1].
     */
    get softKnee(): number;
  
    set softKnee(value: number);
  
    /**
     * @description Gets or sets the bloom threshold.
     * Pixels brighter than this value will trigger the glow. Range: [0, 10].
     */
    get threshold(): number;
  
    set threshold(value: number);
  }
  
  /**
   * @enum
   * @description Enumeration of bokeh blur shape types.
   */
  enum BokehBlurShapeType {
    Hexagon,
    Circle,
  }
  
  /**
   * @class BokehBlur
   * @description Represents a PostEffect specifically designed for the BokehBlur.
   * This class implements a bokeh blur effect commonly used in post-processing to simulate
   * the optical effect of camera lenses, creating aesthetically pleasing blur with highlight points.
   */
  class BokehBlur extends PostEffect {
    protected constructor();
  
    /**
     * @description Gets or sets the downsample factor for the bokeh blur effect.
     * Higher values improve performance but reduce quality. Range: [1, 10].
     */
    get downsample(): number;
  
    set downsample(value: number);
  
    /**
     * @description Gets whether fast circle approximation mode is enabled.
     * @deprecated Fast circle is editor-only and cannot be used at runtime.
     * Improves performance but reduces accuracy.
     */
    get fastCircle(): boolean;
  
    /**
     * @description Sets whether fast circle approximation mode is enabled.
     * @deprecated Fast circle is editor-only and cannot be used at runtime.
     * Improves performance but reduces accuracy.
     */
    set fastCircle(value: boolean);
  
    /**
     * @description Gets or sets the number of iterations for the bokeh blur effect.
     * Higher values produce smoother results at the cost of performance. Range: [1, 10].
     */
    get iterations(): number;
  
    set iterations(value: number);
  
    /**
     * @description Gets the shape type for the bokeh blur effect (e.g., hexagon, circle).
     * Determines the appearance of the blur highlights.
     */
    get shape(): BokehBlurShapeType;
  
    /**
     * @description Sets the shape type for the bokeh blur effect (e.g., hexagon, circle).
     * @deprecated Shape is editor-only and cannot be used at runtime.
     * Determines the appearance of the blur highlights.
     */
    set shape(value: BokehBlurShapeType);
  
    /**
     * @description Gets or sets the size of the bokeh blur effect. Controls the radius of the blur effect.
     * Range: [0, 99999]. Default: 4.0 set in editor.
     */
    get size(): number;
  
    set size(value: number);
  }
  
  /**
   * @class ChromaticAberration
   * @description This class implements chromatic aberration post-processing effects,
   * which simulate the optical phenomenon where different wavelengths of light
   * are focused at slightly different points, causing color fringes.
   */
  class ChromaticAberration extends PostEffect {
    protected constructor();
  
    /**
     * @description Gets or sets whether fast mode for chromatic aberration is enabled.
     * Fast mode improves performance but reduces accuracy of the effect.
     */
    get fastMode(): boolean;
  
    set fastMode(value: boolean);
  
    /**
     * @description Gets or sets the chromatic aberration intensity.
     * Controls how strongly the RGB channels are shifted apart. Range: [-10, 10].
     */
    get intensity(): number;
  
    set intensity(value: number);
  
    /**
     * @description Gets or sets the spectral LUT (Lookup Texture) used for chromatic aberration.
     * Defines how RGB channels are sampled and shifted.
     * @deprecated spectralLUT is deprecated and cannot be used at runtime. Reading it is safe for editor-authored configurations, but new code should prefer `intensity` and `fastMode` instead of relying on a spectral LUT.
     */
    get spectralLUT(): Texture | null;
  
    set spectralLUT(value: Texture | null);
  }
  
  /**
   * @class Custom
   * @description A PostEffect implementation that enables custom post-processing effects through user-defined materials and shaders.
   */
  class Custom extends PostEffect {
    protected constructor();
  
    /**
     * @description Gets or sets the material used for the custom post-process effect.
     * Defines the shader applied in the effect.
     */
    get material(): Material | null;
  
    set material(value: Material | null);
  }
  
  /**
   * @class Distort
   * @description Represents a PostEffect specifically designed for the Distort.
   */
  class Distort extends PostEffect {
    protected constructor();
  
    /**
     * @description Gets or sets the distortion amplitude (X,Y).
     * Defines the strength of the wave-like distortion along each axis.
     * X component controls horizontal distortion strength, Y component controls vertical distortion strength.
     * Range: [-99999, 99999]. Default value is (-0.1, 0.0) set in Editor.
     */
    get amplitude(): Vector2f;
  
    set amplitude(value: Vector2f);
  
    /**
     * @description Gets or sets the barrel distortion power. Controls the strength of the radial distortion.
     * A value of 0 means no distortion, positive values create barrel distortion,
     * negative values create pincushion distortion. Range: [-1, 1].
     */
    get barrelPower(): number;
  
    set barrelPower(value: number);
  
    /**
     * @description Gets or sets the distortion frequency (X,Y).
     * Controls how frequently the distortion waves repeat across the screen.
     * X component controls horizontal wave frequency, Y component controls vertical wave frequency.
     * Range: [-99999, 99999]. Default value is (9.0, 0.0) set in Editor.
     */
    get frequency(): Vector2f;
  
    set frequency(value: Vector2f);
  
    /**
     * @description Gets or sets the distortion offset (X,Y). Shifts the phase of the distortion pattern.
     * X component shifts horizontal wave phase, Y component shifts vertical wave phase.
     * Range: [-99999, 99999]. Default value is (0.0, 0.0).
     */
    get offset(): Vector2f;
  
    set offset(value: Vector2f);
  
    /**
     * @description Gets or sets the distortion rotation angle.
     * Rotates the distortion effect around the screen center. Range: [-360, 360].
     */
    get rotation(): number;
  
    set rotation(value: number);
  
    /**
     * @description Gets or sets the distortion speed (X,Y).
     * Determines the animation speed of the distortion waves.
     * X component controls horizontal wave animation speed, Y component controls vertical wave animation speed.
     * Range: [-99999, 99999]. Default value is (0.8, 0.0) set in Editor.
     */
    get speed(): Vector2f;
  
    set speed(value: Vector2f);
  
    /**
     * @description Gets or sets the zoom factor for the distortion effect.
     * Higher values zoom the image in or out. A value of 1.0 represents no zoom. Range: [-1, 1].
     */
    get zoom(): number;
  
    set zoom(value: number);
  }
  
  /**
   * @class Fxaa
   * @description Represents a PostEffect specifically designed for the Fxaa.
   */
  class Fxaa extends PostEffect {
    protected constructor();
  }
  
  /**
   * @class Grain
   * @description Represents a PostEffect specifically designed for the Grain.
   */
  class Grain extends PostEffect {
    protected constructor();
  
    /**
     * @description Gets or sets the grain color contribution.
     * Adjusts how much color noise is blended into the effect. Range: [0, 1].
     */
    get color(): number;
  
    set color(value: number);
  
    /**
     * @description Gets or sets the grain animation speed.
     * Higher values make the grain move faster across frames. Range: [0, 10].
     */
    get speed(): number;
  
    set speed(value: number);
  
    /**
     * @description Gets or sets the grain strength. Controls the overall intensity of the film grain effect.
     * Range: [0, 1].
     */
    get strength(): number;
  
    set strength(value: number);
  }
  
  /**
   * @class LensFlare
   * @description Represents a PostEffect specifically designed for the LensFlare.
   */
  class LensFlare extends PostEffect {
    protected constructor();
  
    /**
     * @description Gets or sets the lens flare intensity. Controls the brightness of the flare effect.
     * Range: [0, 1].
     */
    get intensity(): number;
  
    set intensity(value: number);
  
    /**
     * @description Gets or sets the lens flare position (X,Y).
     * Defines the screen-space position of the flare source.
     * Vector2f in normalized 0–1 screen coordinates; X: 0–1, left to right. Y: 0–1, bottom to top.
     */
    get position(): Vector2f;
  
    set position(value: Vector2f);
  }
  
  /**
   * @class MotionBlur
   * @description Represents a PostEffect specifically designed for the MotionBlur.
   * This class implements motion blur functionality by accumulating frames over time to create blur trails for moving objects.
   */
  class MotionBlur extends PostEffect {
    protected constructor();
  
    /**
     * @description Gets or sets the motion blur intensity.
     * Controls how strongly moving objects are blurred between frames. Range: [0, 1].
     */
    get intensity(): number;
  
    set intensity(value: number);
  }
  
  /**
   * @class Vignette
   * @description Represents a PostEffect specifically designed for the Vignette.
   */
  class Vignette extends PostEffect {
    protected constructor();
  
    /**
     * @description Gets or sets the vignette contrast value.
     * Adjusts the sharpness of the vignette falloff between center and edges. Range: [1, 50].
     */
    get contrast(): number;
  
    set contrast(value: number);
  
    /**
     * @description Gets or sets the vignette power value.
     * Controls the radial strength of the darkening effect towards screen corners. Range: [0, 10].
     */
    get power(): number;
  
    set power(value: number);
  }
  
  /**
   * @class PostProcess
   * @description Represents a dynamic component specifically designed for the PostProcess.
   * @example
   * ```typescript
   * const bloomObject = scene.findSceneObject("Bloom");
   * if (bloomObject) {
   *   const postProcess = bloomObject.getComponent("PostProcess") as PostProcess;
   *   if (postProcess.bloom) {
   *     postProcess.bloom.intensity = 10.0;
   *   }
   * }
   * ```
   */
  class PostProcess extends DynamicComponent {
    protected constructor();
  
    /**
     * @description Bloom effect configuration. Returns `null` when no Bloom effect is configured on this PostProcess component.
     * Bloom is a visual effect that makes bright areas of the scene appear to glow.
     */
    readonly bloom: Bloom | null;
  
    /**
     * @description Bokeh blur effect configuration. Returns `null` when no BokehBlur effect is configured on this PostProcess component.
     * Simulates the optical effect of defocus blur with customizable shapes.
     */
    readonly bokehBlur: BokehBlur | null;
  
    /**
     * @description Chromatic aberration effect configuration. Returns `null` when no ChromaticAberration effect is configured on this PostProcess component.
     * Simulates the optical effect where different wavelengths of light are focused at different points.
     */
    readonly chromaticAberration: ChromaticAberration | null;
  
    /**
     * @description Custom effect configuration. Returns `null` when no Custom effect is configured on this PostProcess component.
     * Allows for applying user-defined post-processing effects through custom materials.
     */
    readonly custom: Custom | null;
  
    /**
     * @description Distortion effect configuration. Returns `null` when no Distort effect is configured on this PostProcess component.
     * Applies distortion effects to the scene, such as barrel distortion or wave effects.
     */
    readonly distort: Distort | null;
  
    /**
     * @description FXAA (Fast Approximate Anti-Aliasing) effect configuration. Returns `null` when no Fxaa effect is configured on this PostProcess component.
     * Reduces aliasing artifacts in the rendered image with minimal performance impact.
     */
    readonly fxaa: Fxaa | null;
  
    /**
     * @description Film grain effect configuration. Returns `null` when no Grain effect is configured on this PostProcess component.
     * Adds film-like grain to the scene for artistic purposes.
     */
    readonly grain: Grain | null;
  
    /**
     * @description Lens flare effect configuration. Returns `null` when no LensFlare effect is configured on this PostProcess component.
     * Simulates the optical phenomenon that occurs when light hits the lens of a camera.
     */
    readonly lensFlare: LensFlare | null;
  
    /**
     * @description Motion blur effect configuration. Returns `null` when no MotionBlur effect is configured on this PostProcess component.
     * Creates a blur effect based on the velocity of objects or camera movement.
     */
    readonly motionBlur: MotionBlur | null;
  
    /**
     * @description Vignette effect configuration. Returns `null` when no Vignette effect is configured on this PostProcess component.
     * Darkens the edges of the screen to draw attention to the center.
     */
    readonly vignette: Vignette | null;
  }
  
  /**
   * @class PostEffect
   * @description Represents a base class for other post effects.
   */
  class PostEffect extends ScriptCustomObject {
    protected constructor();
  
    /**
     * @description Indicates whether the post effect is enabled.
     */
    enabled: any;
  }
}