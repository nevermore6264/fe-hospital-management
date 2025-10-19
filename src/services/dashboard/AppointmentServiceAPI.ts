import { Appointment, AppointmentResponse } from "../types/Appointment";

export class DashboardAppointmentServiceAPI {
  private static instance: DashboardAppointmentServiceAPI;
  private baseUrl: string = "/api/dashboard/appointments";

  private constructor() {}

  public static getInstance(): DashboardAppointmentServiceAPI {
    if (!DashboardAppointmentServiceAPI.instance) {
      DashboardAppointmentServiceAPI.instance =
        new DashboardAppointmentServiceAPI();
    }
    return DashboardAppointmentServiceAPI.instance;
  }

  // Lấy lịch hẹn cho dashboard
  async getDashboardAppointments(): Promise<AppointmentResponse> {
    try {
      await this.delay(400);

      // Mock data cho dashboard
      const mockAppointments: Appointment[] = [
        {
          id: "1",
          patientId: "1",
          patientName: "Nguyễn Văn A",
          doctorId: "2",
          doctorName: "Dr. Trần Thị Hương",
          date: "2024-09-17",
          time: "09:00",
          type: "consultation",
          status: "scheduled",
          symptoms: "Đau ngực, khó thở",
          fee: 200000,
        },
        {
          id: "2",
          patientId: "2",
          patientName: "Trần Thị B",
          doctorId: "2",
          doctorName: "Dr. Trần Thị Hương",
          date: "2024-09-17",
          time: "10:30",
          type: "follow-up",
          status: "in-progress",
          symptoms: "Tái khám hen suyễn",
          fee: 150000,
        },
      ];

      return {
        success: true,
        data: mockAppointments,
        message: "Lấy lịch hẹn dashboard thành công",
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: "Có lỗi xảy ra khi lấy lịch hẹn dashboard",
      };
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const dashboardAppointmentServiceAPI =
  DashboardAppointmentServiceAPI.getInstance();
