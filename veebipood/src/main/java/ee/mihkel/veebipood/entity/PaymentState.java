package ee.mihkel.veebipood.entity;

public enum PaymentState {
    initial, // maksmata, aga mindud maksma
    settled, // edukas, makstud
    abandoned, // 15 minutit on maksekeskkonnas oodatud aga pole makset tehtud
    failed, // tehnilised errorid või raha on otsas
    voided  // kasutaja paneb ise cancel
}
