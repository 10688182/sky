let sender = [
    {
        id: '3509875671',
        name: 'John Mays',
        content: 'Gold Bars - 158KG',
    }
];

let process = {
    '3509875671': [
        {
            date: '13-03-2025, 11:23 AM',
            status: 'Origin',
            Message: "Shipment Request Received",
            remark: 'There is currently no scheduled delivery date available.',
            content: 'Gold Bars - 158KG',
            color: 'bg-dark text-light',
            line_color: 'bg-dark',
            location: 'London BS2 OPS, UK',
            route: "GB &rarr; MT &rarr; US-TX"
        },

        {
            date: '13-03-2025, 12:50 PM',
            status: 'At Local SkyBridge Facility',
            Message: "PICKED UP",
            remark: 'There is currently no scheduled delivery date available.',
            content: 'Content: Gold Bars - 158KG',
            color: 'bg-success text-light',
            line_color: 'bg-light',
            location: 'Southampton, UK',
            route: "GB &rarr; MT &rarr; US-TX"
        },

        {
            date: '14-03-2025, 10:00 AM',
            status: 'International shipment release - Export',
            Message: "EN ROUTE TO MALTA (MT)",
            remark: 'There is currently no scheduled delivery date available.',
            content: 'Content: Gold Bars - 158KG',
            color: 'bg-info text-light',
            line_color: 'bg-light',
            location: 'Southampton Airport, UK',
            route: "GB &rarr; MT &rarr; US-TX"
        },

        {
            date: '17-03-2025, 8:00 AM',
            status: 'International shipment release - Import',
            Message: "ARRIVAL IN MALTA (MT)",
            remark: 'There is currently no scheduled delivery date available.',
            content: 'Content: Gold Bars - 158KG',
            color: 'bg-info text-light',
            line_color: 'bg-light',
            location: 'Malta International Airport, MT',
            route: "GB &rarr; MT &rarr; US-TX"
        },

        {
            date: '17-03-2025, 11:00 AM',
            status: 'Clearance Delay',
            Message: "CLEARANCE DELAY",
            remark: 'Commercial invoice incomplete! <br> Shipper must provide a completed Commercial Invoice.',
            content: 'Content: Gold Bars - 158KG',
            color: 'bg-danger text-light',
            line_color: 'bg-light',
            location: 'Malta International Airport, MT',
            route: "GB &rarr; MT &rarr; US-TX"
        },
    ]
};

$(document).ready(function () {
    // Hide content on load if it's out of view
    $('.content').each(function () {
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).height();

        if (bottom_of_object > bottom_of_window) {
            $(this).addClass('hidden');
        }
    });

    // Reveal content on scroll
    $(window).scroll(function () {
        $('.hidden').each(function () {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if (bottom_of_window > bottom_of_object) {
                $(this).animate({ 'opacity': '1' }, 700);
            }
        });
    });


  
    // Tracking button click event
    $(document).on('click', '.track', function () {
        const form_input = $('.form_input_data').val();

        if (!form_input) {
            Swal.fire({
                icon: "error",
                title: "Enter Tracking Number...!",
                showConfirmButton: true,
            });
            return;
        }

        console.log("Input value:", form_input);
        const request = sender.find((item) => item.id == form_input);

        if (request) {
            console.log(process[request.id]);

            let timerInterval;
            Swal.fire({
                title: "TRACKING SHIPMENT...!",
                html: "Fetching Data...!",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    timerInterval = setInterval(() => {
                        Swal.getPopup().querySelector("b").textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("Timeup");
                }
            });

            setTimeout(() => {
                Swal.fire({
                    html: `
                    <section class="timeline__cover">
                        <div class="timeline">
                            <div class="timeline__title">
                                <h5 class="text-muted">TRACKING SUMMARY - ${form_input}</h5>
                                <h3>SCHEDULED DELIVERY  <br> <p>Will be updated soon. </p></h3>
                                <h4>${process[request.id][process[request.id].length - 1].Message}
                                    <br>
                                    <p>${process[request.id][process[request.id].length - 1].location}</p>
                                    <p>${process[request.id][process[request.id].length - 1].content}</p>
                                    <h6>${process[request.id][process[request.id].length - 1].remark}</h6>
                                    <h3>${process[request.id][process[request.id].length - 1].route}</h3>
                                </h4>
                            </div>
                            <ul class="mt-4">
                                ${process[request.id].map((item) => `
                                    <li>
                                        <div class="content">
                                            <div class="badge ${item.color}">${item.status}</div>
                                            <div>
                                                <br>
                                                <p>${item.location}</p>
                                                <p>${item.date}</p>
                                            </div>
                                        </div>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </section>`,
                    showConfirmButton: false,
                    showCloseButton: true,
                });
            }, 2000);
        } else {
            Swal.fire({
                icon: "error",
                title: "Wrong Tracking Number...!",
                showConfirmButton: true,
            });
        }
    });
});
