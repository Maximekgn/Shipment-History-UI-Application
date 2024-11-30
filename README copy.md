### **Programming Exercise: Development of Shipment History UI Webpage**

---

**Objective:**

Your task is to develop a responsive UI webpage for displaying Shipment History using the attached data, in accordance with the specifications provided in this design document: [Shipment History Design](https://www.figma.com/file/jyg0UdEWymc3Mzz8CJkpYx/Shipment-History-V2?node-id=0%3A1). Please note that a free account creation may be necessary for access to the detailed specifications including font sizes and spacing.

Your application should be capable of reading the provided JSON file. Please ensure this, as your code will be tested internally with a larger shipment JSON file to measure consistency and completeness of your solution.

---

**Acceptance Criteria:**

1. **Icon Use**: Incorporate icons from [Clarity Design Icons](https://core.clarity.design/foundation/icons/shapes/).

2. **Font Selection**: Implement the Montserrat fontface in your design. This is available on [Google Fonts](https://fonts.google.com/specimen/Montserrat).

3. **Date Display**: Ensure that each date is displayed only once, even when there are multiple shipment events on the same date.

4. **Shipment Delay Identification**: Make sure a delayed shipment is identifiable by a distinct color, which is dictated by the Boolean `shipmentIsDelayed` property.

5. **Shipment Exception Identification**: Any exceptions on a shipment should be easily recognizable by a unique color. The Boolean `shipmentException` property controls this.

6. **Display Compactness**: Ensure that the city and state information is displayed in a compact manner on mobile views as compared to desktop views.

7. **Shipment Arrival Identification**: A shipment that has arrived at the shipment center should be marked with a 'map-marker' icon. The corresponding data property is `ARRIVED AT LOCATION`.

8. **Comment Display**: Any comments that extend beyond three lines should be initially hidden with a 'View All' button. Clicking on 'View All' should expand the comments. A 'View Less' button should then be displayed to collapse the expanded comments.

9. **Shipment Delivery Identification**: A shipment that has been delivered should be marked with a 'check' icon. The data property for this event is `DELIVERED`.

10. **Data Integrity**: The integrity of the attached dataset samples must be maintained and not altered to run the web application. We will test your submission against multiple datasets to verify its correctness and robustness.

---

**Submission Guidelines:**

1. Include a README.md file in your repository, providing clear instructions on how to run your code.

2. Commit your changes and push your code to your GitHub account.

3. Email the link to your GitHub repository to [careers@zovu.africa](mailto:careers@zovu.africa).

Please note that we will not accept submissions in zip file format. We only accept Git repository URLs with public access.

---

Evaluation of your work will be based on how closely it aligns with the provided design document and the extent to which it fulfills the acceptance criteria.

**Please upload your solution to your personal Git account and forward the repository URL to careers@zovu.africa. Kindly ensure that your Curriculum Vitae (CV) is included in the email.