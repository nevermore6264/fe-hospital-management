import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Calendar,
  Clock,
  Plus,
  Edit2,
  Eye,
  CheckCircle,
  XCircle,
  User,
  Stethoscope,
  Edit,
  Trash2,
  CalendarDays,
  List,
} from "lucide-react";
import { Appointment } from "./types";
import { useAuth } from "./AuthContext";

// Mock data
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
  {
    id: "3",
    patientId: "3",
    patientName: "Lê Văn C",
    doctorId: "3",
    doctorName: "Dr. Nguyễn Minh D",
    date: "2024-09-17",
    time: "14:00",
    type: "consultation",
    status: "completed",
    symptoms: "Đau lưng mãn tính",
    notes: "Đã khám và kê đơn thuốc",
    fee: 250000,
  },
  {
    id: "4",
    patientId: "1",
    patientName: "Nguyễn Văn A",
    doctorId: "2",
    doctorName: "Dr. Trần Thị Hương",
    date: "2024-09-18",
    time: "15:30",
    type: "emergency",
    status: "cancelled",
    symptoms: "Cấp cứu tim mạch",
    fee: 500000,
  },
];

export function AppointmentManagement() {
  const { user } = useAuth();
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [editForm, setEditForm] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    type: "",
    status: "",
    symptoms: "",
    fee: 0,
  });

  const filteredAppointments = appointments.filter((appointment) => {
    if (statusFilter !== "all" && appointment.status !== statusFilter)
      return false;

    // Filter by user role
    if (user?.role === "DOCTOR") {
      return appointment.doctorName.includes(user.name || "");
    }
    if (user?.role === "PATIENT") {
      return appointment.patientName.includes(user.name || "");
    }

    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Đã lên lịch</Badge>;
      case "in-progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Đang khám</Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
        );
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "consultation":
        return <Badge variant="outline">Khám bệnh</Badge>;
      case "follow-up":
        return <Badge variant="secondary">Tái khám</Badge>;
      case "emergency":
        return <Badge variant="destructive">Cấp cứu</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsViewDialogOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditForm({
      patientName: appointment.patientName,
      doctorName: appointment.doctorName,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status,
      symptoms: appointment.symptoms,
      fee: appointment.fee,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteAppointment = () => {
    if (selectedAppointment) {
      setAppointments(
        appointments.filter((a) => a.id !== selectedAppointment.id)
      );
      setIsDeleteDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  const handleUpdateAppointment = () => {
    if (selectedAppointment) {
      setAppointments(
        appointments.map((a) =>
          a.id === selectedAppointment.id ? { ...a, ...editForm } : a
        )
      );
      setIsEditDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: newStatus as any } : apt
      )
    );
  };

  const canAddAppointment = ["ADMIN", "RECEPTIONIST", "PATIENT"].includes(
    user?.role || ""
  );
  const canManageStatus = ["ADMIN", "DOCTOR", "RECEPTIONIST"].includes(
    user?.role || ""
  );

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateForComparison = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = formatDateForComparison(date);
    return filteredAppointments.filter((apt) => apt.date === dateStr);
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      );
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const CalendarView = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              Lịch hẹn -{" "}
              {currentDate.toLocaleDateString("vi-VN", {
                month: "long",
                year: "numeric",
              })}
            </CardTitle>
            <CardDescription>Xem lịch hẹn theo dạng lịch</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("prev")}
            >
              ←
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Hôm nay
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("next")}
            >
              →
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
            <div
              key={day}
              className="p-2 text-center font-medium text-gray-500 text-sm"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {generateCalendarDays().map((day, index) => {
            if (!day) {
              return <div key={index} className="p-2 h-24"></div>;
            }

            const appointments = getAppointmentsForDate(day);
            const isToday =
              formatDateForComparison(day) ===
              formatDateForComparison(new Date());

            return (
              <div
                key={index}
                className={`p-2 h-24 border rounded-lg hover:bg-gray-50 ${
                  isToday ? "bg-blue-50 border-blue-200" : "border-gray-200"
                }`}
              >
                <div
                  className={`text-sm font-medium mb-1 ${
                    isToday ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {day.getDate()}
                </div>
                <div className="space-y-1">
                  {appointments.slice(0, 2).map((apt, aptIndex) => (
                    <div
                      key={aptIndex}
                      className={`text-xs p-1 rounded truncate cursor-pointer ${
                        apt.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : apt.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : apt.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                      onClick={() => handleViewAppointment(apt)}
                      title={`${apt.time} - ${apt.patientName}`}
                    >
                      {apt.time} {apt.patientName}
                    </div>
                  ))}
                  {appointments.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{appointments.length - 2} khác
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {user?.role === "PATIENT" ? "Lịch hẹn của tôi" : "Quản lý Lịch hẹn"}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === "PATIENT"
              ? "Xem và quản lý các lịch hẹn của bạn"
              : "Quản lý lịch hẹn khám bệnh của bệnh viện"}
          </p>
        </div>
        {canAddAppointment && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {user?.role === "PATIENT" ? "Đặt lịch hẹn" : "Thêm lịch hẹn"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm lịch hẹn mới</DialogTitle>
                <DialogDescription>
                  Tạo lịch hẹn khám bệnh mới
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Bệnh nhân</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn bệnh nhân" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Nguyễn Văn A</SelectItem>
                      <SelectItem value="2">Trần Thị B</SelectItem>
                      <SelectItem value="3">Lê Văn C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">Bác sĩ</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn bác sĩ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">
                        Dr. Trần Thị Hương - Tim mạch
                      </SelectItem>
                      <SelectItem value="3">
                        Dr. Nguyễn Minh D - Thần kinh
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Ngày khám</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Giờ khám</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Loại khám</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại khám" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Khám bệnh</SelectItem>
                      <SelectItem value="follow-up">Tái khám</SelectItem>
                      <SelectItem value="emergency">Cấp cứu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fee">Phí khám (VNĐ)</Label>
                  <Input id="fee" type="number" placeholder="200000" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="symptoms">Triệu chứng</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Mô tả triệu chứng và lý do khám..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Tạo lịch hẹn
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* View Mode Toggle and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc và hiển thị</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="scheduled">Đã lên lịch</SelectItem>
                    <SelectItem value="in-progress">Đang khám</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label>Hiển thị:</Label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="flex items-center gap-2"
                >
                  <List className="h-4 w-4" />
                  Bảng
                </Button>
                <Button
                  variant={viewMode === "calendar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                  className="flex items-center gap-2"
                >
                  <CalendarDays className="h-4 w-4" />
                  Lịch
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Content */}
      {viewMode === "calendar" ? (
        <CalendarView />
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Danh sách lịch hẹn</CardTitle>
                <CardDescription>
                  Tổng cộng {filteredAppointments.length} lịch hẹn
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Bệnh nhân</TableHead>
                  <TableHead>Bác sĩ</TableHead>
                  <TableHead>Loại khám</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Phí khám</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(appointment.date).toLocaleDateString(
                            "vi-VN"
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {appointment.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {appointment.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {appointment.patientName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Stethoscope className="h-4 w-4 text-blue-600" />
                        <span>{appointment.doctorName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(appointment.type)}</TableCell>
                    <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                    <TableCell>
                      {appointment.fee.toLocaleString("vi-VN")} ₫
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewAppointment(appointment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {(user?.role === "ADMIN" ||
                          user?.role === "SUPERADMIN") && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditAppointment(appointment)}
                              className="hover:bg-blue-100 hover:text-blue-700"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDeleteAppointment(appointment)
                              }
                              className="text-red-600 hover:bg-red-100 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {canManageStatus &&
                          appointment.status === "scheduled" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700"
                                onClick={() =>
                                  handleStatusChange(
                                    appointment.id,
                                    "in-progress"
                                  )
                                }
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() =>
                                  handleStatusChange(
                                    appointment.id,
                                    "cancelled"
                                  )
                                }
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        {canManageStatus &&
                          appointment.status === "in-progress" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-700"
                              onClick={() =>
                                handleStatusChange(appointment.id, "completed")
                              }
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* View Appointment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Chi tiết lịch hẹn</span>
            </DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">
                    Thông tin bệnh nhân
                  </h4>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {selectedAppointment.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {selectedAppointment.patientName}
                      </p>
                      <p className="text-sm text-gray-500">
                        ID: {selectedAppointment.patientId}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">
                    Thông tin bác sĩ
                  </h4>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Stethoscope className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {selectedAppointment.doctorName}
                      </p>
                      <p className="text-sm text-gray-500">
                        ID: {selectedAppointment.doctorId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">
                    Chi tiết lịch hẹn
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Ngày:</span>
                      <span className="text-sm font-medium">
                        {new Date(selectedAppointment.date).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Giờ:</span>
                      <span className="text-sm font-medium">
                        {selectedAppointment.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Loại khám:</span>
                      {getTypeBadge(selectedAppointment.type)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Trạng thái:</span>
                      {getStatusBadge(selectedAppointment.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Phí khám:</span>
                      <span className="text-sm font-medium">
                        {selectedAppointment.fee.toLocaleString("vi-VN")} ₫
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Triệu chứng</h4>
                  <p className="text-sm text-gray-700">
                    {selectedAppointment.symptoms}
                  </p>

                  {selectedAppointment.notes && (
                    <>
                      <h4 className="font-medium text-gray-900 mt-4">
                        Ghi chú
                      </h4>
                      <p className="text-sm text-gray-700">
                        {selectedAppointment.notes}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Đóng
                </Button>
                {canManageStatus && (
                  <Button>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-600" />
              Chỉnh sửa lịch hẹn
            </DialogTitle>
            <DialogDescription>
              Cập nhật thông tin lịch hẹn #{selectedAppointment?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-patient">Tên bệnh nhân</Label>
                <Input
                  id="edit-patient"
                  value={editForm.patientName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, patientName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-doctor">Bác sĩ</Label>
                <Input
                  id="edit-doctor"
                  value={editForm.doctorName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, doctorName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-date">Ngày hẹn</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editForm.date}
                  onChange={(e) =>
                    setEditForm({ ...editForm, date: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-time">Giờ hẹn</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={editForm.time}
                  onChange={(e) =>
                    setEditForm({ ...editForm, time: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-type">Loại hẹn</Label>
                <Select
                  value={editForm.type}
                  onValueChange={(value) =>
                    setEditForm({ ...editForm, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Khám bệnh</SelectItem>
                    <SelectItem value="follow-up">Tái khám</SelectItem>
                    <SelectItem value="emergency">Cấp cứu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-status">Trạng thái</Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) =>
                    setEditForm({ ...editForm, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Đã lên lịch</SelectItem>
                    <SelectItem value="in-progress">Đang khám</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-fee">Chi phí</Label>
                <Input
                  id="edit-fee"
                  type="number"
                  value={editForm.fee}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      fee: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-symptoms">Triệu chứng</Label>
              <Textarea
                id="edit-symptoms"
                value={editForm.symptoms}
                onChange={(e) =>
                  setEditForm({ ...editForm, symptoms: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              onClick={handleUpdateAppointment}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Cập nhật
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Appointment Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Xác nhận xóa lịch hẹn
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa lịch hẹn của bệnh nhân{" "}
              <strong>{selectedAppointment?.patientName}</strong>
              với bác sĩ <strong>{selectedAppointment?.doctorName}</strong>?
              <br />
              <span className="text-red-600 mt-2 block">
                Hành động này không thể hoàn tác.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteAppointment}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa lịch hẹn
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
