Here is a sample report to publish in your GitHub repository, explaining the **Critical Value** implementation in the Frappe framework. This report covers both backend and frontend changes, along with instructions and code.

---

# Critical Value Implementation in Frappe Framework

## Overview

This repository explains the implementation of **Critical Value** in the Frappe framework. A **Critical Value** refers to lab test results that fall outside predefined thresholds, indicating a medical emergency. This implementation will automatically detect and flag critical values in lab tests.

This document walks through:
1. **Backend Changes**: How to modify backend logic to handle critical values.
2. **Frontend Changes**: How to add fields in the Lab Test template to capture and display critical values.

---

## Backend Changes

In the backend, I created two main functions that handle the assignment of critical values: `create_normals` and `create_compounds`. These functions append critical values to each test item in the Lab Test. The code changes are shown below:

### 1. **Backend Code - Critical Value Logic**

```python
def create_normals(template, lab_test):
    Lab_test.normal_toggle = 1
    normal = lab_test.append("normal_test_items")
    normal.lab_test_name = template.lab_test_name
    normal.lab_test_uom = template.lab_test_uom
    normal.secondary_uom = template.secondary_uom
    normal.conversion_factor = template.conversion_factor
    normal.normal_range = template.lab_test_normal_range
    normal.critical_value = template.lab_test_critical_value  # Critical value field
    normal.require_result_value = 1
    normal.allow_blank = 0
    normal.template = template.name
```

### 2. **create_compounds Function** (for compound tests)

```python
def create_compounds(template, lab_test, is_group):
    Lab_test.normal_toggle = 1
    for normal_test_template in template.normal_test_templates:
        normal = Lab_test.append("normal_test_items")
        if is_group:
            normal.lab_test_event = normal_test_template.lab_test_event
        else:
            normal.lab_test_name = normal_test_template.lab_test_event
        
        normal.lab_test_uom = normal_test_template.lab_test_uom
        normal.secondary_uom = normal_test_template.secondary_uom
        normal.conversion_factor = normal_test_template.conversion_factor
        normal.normal_range = normal_test_template.normal_range
        normal.critical_value = normal_test_template.critical_value  # Critical value field
        normal.require_result_value = 1
        normal.allow_blank = normal_test_template.allow_blank
        normal.template = template.name
```

---

## Frontend Changes

To capture and display critical values, I added new fields to the **Lab Test Template** and **Normal Test Template** DocTypes. This will allow healthcare professionals to define critical value thresholds for each test.

### 1. **Lab Test Template Field**

I added a field named `lab_test_critical_value` in the **Lab Test Template**.

- **Field Name**: `lab_test_critical_value`
- **Label**: Critical Value
- **Type**: Long Text (to allow flexibility in defining complex ranges)

**Screenshot**:

![Lab Test Template Critical Value Field]([file-Lia9gsHVYIuWqOd6RQIiFa2J.png](https://github.com/user-attachments/assets/1c00cc4a-cdbf-498f-91ee-23639b7e57d8))

### 2. **Normal Test Template Field**

In the **Normal Test Template**, a similar field for critical values is added.

- **Field Name**: `critical_value`
- **Label**: Critical Value
- **Type**: Long Text

**Screenshot**:

![Normal Test Template Critical Value Field](https://github.com/user-attachments/assets/a7e5c3c6-fc03-4a87-bb67-48dbaa801b71)

---

## Notification for Critical Values

To notify healthcare professionals when a critical!
 value is detected, I configured a system notification in the **Lab Test** Doctype. The condition is based on the `result_status` field.

### Notification Setup:
- **Document Type**: Lab Test
- **Send Alert On**: Save
- **Condition**: `doc.result_status in ["Critical", "Abnormal"]`

This condition checks whether the result status is either "Critical" or "Abnormal." If so, an alert is sent to the relevant stakeholders (e.g., Administrator, Lab User).

**Screenshot**:

![Notification Setup for Critical Values](https://github.com/user-attachments/assets/f71df9ec-bc4c-463b-bc0d-0b3b286cb33e)

![Notification Setup](https://github.com/user-attachments/assets/53a3988d-b6fe-47fe-bc44-ce7cb7532835)

---

## Conclusion

This implementation ensures that healthcare professionals are immediately notified if a lab test returns a **Critical Value**, helping to ensure timely intervention. By adding the **Critical Value** field to the backend and frontend components, the system can automatically detect and flag abnormal or critical results.

Feel free to contribute by creating a pull request or providing suggestions for improvement.
