declare namespace APJS {
  /**
   * @description Enum Segmentation type.
   * @enum {number}
   * @property Portrairt - Portrairt segmentation (Historical misspelling).
   * @property Hair - Hair segmentation.
   * @property Head - Head segmentation.
   * @property Hand - Hand segmentation.
   * @property Cloth - Cloth segmentation.
   * @property Sky - Sky segmentation.
   * @property Ground - Ground segmentation.
   * @property Building - Building segmentation.
   * @property Skin - Skin segmentation.
   * @property Pet - Pet segmentation.
   * @property Ear - Ear segmentation.
   * @property Lip - Lip segmentation.
   * @property Teeth - Teeth segmentation.
   * @property Eye - Eye segmentation.
   * @property Saliency - Saliency segmentation.
   * @property Face - Face segmentation.
   */
  enum SegmentationType {
    Portrairt,
    Hair,
    Head,
    Hand,
    Cloth,
    Sky,
    Ground,
    Building,
    Skin,
    Pet,
    Ear,
    Lip,
    Teeth,
    Eye,
    Saliency,
    Face,
  }
  
  /**
   * @description Enum Pet type.
   * @enum {number}
   * @property Cat - detect cat.
   * @property Dog - detect dog.
   */
  enum PetType {
    Cat,
    Dog,
  }
  
  /**
   * @class SegmentationTexture
   * @description Represents a provider specifically designed for the SegmentationTexture asset.
   */
  class SegmentationTextureProvider extends ScreenTextureProvider implements IDynamicAsset {
    protected constructor();
  
    /**
     * @description Whether the generated mask output is inverted.
     * `true` swaps foreground and background in the mask; `false` keeps the original output.
     */
    get invertMask(): boolean;
  
    set invertMask(value: boolean);
  
    /**
     * @description Selected pet categories used when `segmentationType` is `SegmentationType.Pet`.
     * Values must come from the `PetType` enum (`PetType.Cat = 1`, `PetType.Dog = 2`)
     * `null`, `undefined`, or an empty array on set are silently ignored.
     */
    get petType(): PetType[];
  
    set petType(value: PetType[]);
  
    /**
     * @description The segmentation type used by this provider.
     * Determines which segmentation algorithm is active and which secondary properties (`trackIndex`, `petType`) apply.
     * No validation is applied on set; the default internal value is `-1` (no active type).
     * Setting an out-of-enum value leaves the provider in an inactive state.
     */
    get segmentationType(): SegmentationType;
  
    set segmentationType(value: SegmentationType);
  
    /**
     * @description Smoothness factor applied to the segmentation mask edge. Valid range: `[0, 1]`.
     * A value of `0` produces the sharpest edge, while `1` (default) produces the softest edge.
     */
    get smoothness(): number;
  
    set smoothness(value: number);
  
    /**
     * @description Tracked face/body indices for the current segmentation type.
     * Supported types: `Head`, `Hand`, `Pet`, `Ear`, `Lip`, `Teeth`, `Face`, `Eye`.
     * Getter returns the array for the active type, or `[]` for types that do not use tracked indices
     * (e.g. `Portrairt`, `Hair`, `Cloth`, `Sky`).
     * `null`, `undefined`, or an empty array are silently ignored.
     * Setting when `segmentationType` is not one of the 8 supported types is also a no-op.
     */
    get trackIndex(): number[];
  
    set trackIndex(value: number[]);
  }
}